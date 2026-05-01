const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

/* ========================
   MIDDLEWARE
======================== */
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ========================
   HOME
======================== */
app.get("/", (req, res) => {
  res.send("E-commerce API running 🚀");
});

/* ========================
   PRODUCTS API
======================== */

// GET ALL PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to get products" });
  }
});

// CREATE PRODUCT
app.post("/products", async (req, res) => {
  try {
    const { name, price, quantity, description, image } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        quantity: Number(quantity),
        description,
        image
      }
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// UPDATE PRODUCT
app.put("/products/:id", async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE PRODUCT
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await prisma.product.delete({
      where: { id: Number(req.params.id) }
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

/* ========================
   AUTH SYSTEM
======================== */

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "user"
      }
    });

    res.json({ message: "User registered successfully" });

  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

/* ========================
   CHECKOUT (ORDERS)
======================== */

app.post("/checkout", async (req, res) => {
  try {
    const { userId, cart, total } = req.body;

    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        total: Number(total),
        items: JSON.stringify(cart)
      }
    });

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Checkout failed" });
  }
});

/* ========================
   SERVER START
======================== */
app.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});