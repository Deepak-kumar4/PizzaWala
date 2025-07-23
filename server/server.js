const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const pizzaRoutes=require("./routes/pizza.routes");
const menuRoutes = require("./routes/menu.routes")
const cartRoutes =require("./routes/cart.routes")

const app = express();

// ✅ Allow cookies to be sent from frontend
app.use(cors({
  origin: "http://localhost:3000", // replace with your frontend URL
  credentials: true, // must be true to allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes); 
app.use("/api/pizzas",pizzaRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

