import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const port = 4000;

// 🧠 Middlewares
app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

// ⚙️ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/shopapp")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// 🧩 Product Schema
const Product = mongoose.model("Product", {
  name: String,
  category: String,
  image: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: Boolean,
});

// 🧩 User Schema
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  cartData: { type: Object, default: {} },
});

// 🔐 JWT Secret
const jwtKey = "ecommerce-secret-key";

// 📦 Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./images";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// 🧠 Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["auth-token"];
  if (!token) return res.status(401).json({ success: false, message: "Token missing" });

  jwt.verify(token, jwtKey, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });
    req.user = user;
    next();
  });
};

// 🧩 Routes

// ✅ Get all products
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// ✅ Get new collections
app.get("/newcollections", async (req, res) => {
  const newProducts = await Product.find({}).sort({ date: -1 }).limit(8);
  res.json(newProducts);
});

// ✅ Get popular products in women category
app.get("/popularinwomen", async (req, res) => {
  const popular = await Product.find({ category: "women" }).limit(4);
  res.json(popular);
});

// ✅ Get user cart (changed from POST → GET)
app.get("/getcart", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, cartData: user.cartData });
});

// ✅ Add product (admin upload)
app.post("/addproduct", upload.single("image"), async (req, res) => {
  const { name, category, new_price, old_price } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : "";

  const product = new Product({ name, category, new_price, old_price, image, available: true });
  await product.save();
  res.json({ success: true, message: "Product added successfully", product });
});

// ✅ Remove product (admin)
app.post("/removeproduct", async (req, res) => {
  const { id } = req.body;
  const deleted = await Product.findByIdAndDelete(id);
  res.json({ success: !!deleted });
});

// ✅ Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.json({ success: false, message: "Email already registered" });

  const user = new User({ name, email, password });
  await user.save();

  const token = jwt.sign({ id: user._id, email }, jwtKey, { expiresIn: "7d" });
  res.json({ success: true, token });
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.json({ success: false, message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email }, jwtKey, { expiresIn: "7d" });
  res.json({ success: true, token });
});

// ✅ Add to cart
app.post("/addtocart", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  const { itemId } = req.body;
  if (!user.cartData[itemId]) user.cartData[itemId] = 1;
  else user.cartData[itemId] += 1;
  await user.save();
  res.json({ success: true });
});

// ✅ Remove from cart
app.post("/removefromcart", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  const { itemId } = req.body;
  if (user.cartData[itemId]) user.cartData[itemId] -= 1;
  if (user.cartData[itemId] <= 0) delete user.cartData[itemId];
  await user.save();
  res.json({ success: true });
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// 🟢 Start server
app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));
