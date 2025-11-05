import React from "react";
import Navbar from "./Components/Navbar/Navbar"; // Must match exact folder/file name
import Admin from "./Pages/Admin/Admin";

const App = () => {
  return (
    <div>
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;
