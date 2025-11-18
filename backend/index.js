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
  .then(() => {
    console.log("✅ MongoDB Connected");
    initializeSampleProducts();
  })
  .catch(err => console.log("❌ MongoDB Error:", err));

// 📦 Initialize sample products
const initializeSampleProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("📦 Adding sample products...");
      const sampleProducts = [
        // Men's Products
        { name: "Blue Casual Shirt", category: "men", image: "/images/mens_shirt.png", new_price: 45.00, old_price: 65.00, available: true },
        { name: "Black Formal Pants", category: "men", image: "/images/mens_pants.png", new_price: 55.00, old_price: 80.00, available: true },
        { name: "Sports Running Shoes", category: "men", image: "/images/mens_shoes.png", new_price: 60.00, old_price: 90.00, available: true },
        { name: "Denim Jacket", category: "men", image: "/images/mens_jacket.png", new_price: 70.00, old_price: 100.00, available: true },
        { name: "Polo T-Shirt", category: "men", image: "/images/mens_tshirt.png", new_price: 25.00, old_price: 40.00, available: true },
        { name: "Wool Sweater", category: "men", image: "/images/mens_sweater.png", new_price: 50.00, old_price: 75.00, available: true },
        { name: "Khaki Chinos", category: "men", image: "/images/mens_chinos.png", new_price: 35.00, old_price: 55.00, available: true },
        { name: "Leather Belt", category: "men", image: "/images/mens_belt.png", new_price: 20.00, old_price: 35.00, available: true },
        
        // Women's Products
        { name: "Striped Flutter Sleeve Blouse", category: "women", image: "/images/womens_blouse.png", new_price: 50.00, old_price: 80.50, available: true },
        { name: "Floral Summer Dress", category: "women", image: "/images/womens_dress.png", new_price: 65.00, old_price: 100.00, available: true },
        { name: "Black Leggings", category: "women", image: "/images/womens_leggings.png", new_price: 30.00, old_price: 50.00, available: true },
        { name: "Comfortable Sneakers", category: "women", image: "/images/womens_shoes.png", new_price: 55.00, old_price: 85.00, available: true },
        { name: "Cardigan Sweater", category: "women", image: "/images/womens_cardigan.png", new_price: 45.00, old_price: 70.00, available: true },
        { name: "Denim Skirt", category: "women", image: "/images/womens_skirt.png", new_price: 40.00, old_price: 65.00, available: true },
        { name: "Casual Blazer", category: "women", image: "/images/womens_blazer.png", new_price: 60.00, old_price: 95.00, available: true },
        { name: "Sports Bra", category: "women", image: "/images/womens_bra.png", new_price: 35.00, old_price: 55.00, available: true },
        
        // Kids' Products
        { name: "Colorful Kids T-Shirt", category: "kid", image: "/images/kids_tshirt.png", new_price: 15.00, old_price: 25.00, available: true },
        { name: "Kids Denim Jeans", category: "kid", image: "/images/kids_jeans.png", new_price: 25.00, old_price: 40.00, available: true },
        { name: "Kids Sneakers", category: "kid", image: "/images/kids_shoes.png", new_price: 30.00, old_price: 50.00, available: true },
        { name: "Cartoon Character Hoodie", category: "kid", image: "/images/kids_hoodie.png", new_price: 35.00, old_price: 55.00, available: true },
        { name: "Kids Summer Shorts", category: "kid", image: "/images/kids_shorts.png", new_price: 20.00, old_price: 35.00, available: true },
        { name: "Rainbow Striped Dress", category: "kid", image: "/images/kids_dress.png", new_price: 28.00, old_price: 45.00, available: true },
        { name: "Kids Sports Jacket", category: "kid", image: "/images/kids_jacket.png", new_price: 40.00, old_price: 65.00, available: true },
        { name: "Comfortable Sandals", category: "kid", image: "/images/kids_sandals.png", new_price: 18.00, old_price: 30.00, available: true },
      ];

      await Product.insertMany(sampleProducts);
      console.log("✅ Sample products added successfully!");
    } else {
      console.log(`✅ Database already has ${count} products`);
    }
  } catch (err) {
    console.error("❌ Error initializing products:", err);
  }
};

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

// ✅ Get products by category
app.get("/productsbycategory/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.json({ success: false, message: "Error fetching products", error: err.message });
  }
});

// ✅ Get user cart (changed from POST → GET)
app.get("/getcart", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, cartData: user.cartData });
});

// ✅ Upload image (admin)
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "No file uploaded" });
  }
  res.json({ success: true, image_url: `/images/${req.file.filename}` });
});

// ✅ Add product (admin upload)
app.post("/addproduct", async (req, res) => {
  try {
    const { name, category, new_price, old_price, image } = req.body;
    
    if (!name || !category || !new_price || !old_price || !image) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const product = new Product({ name, category, new_price, old_price, image, available: true });
    await product.save();
    res.json({ success: true, message: "Product added successfully", product });
  } catch (err) {
    res.json({ success: false, message: "Error adding product", error: err.message });
  }
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

// 🟢 Start server (bind to 0.0.0.0 to ensure IPv4 listens correctly)
const server = app.listen(port, '0.0.0.0', () => console.log(`✅ Server running on http://localhost:${port}`));

server.on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});
