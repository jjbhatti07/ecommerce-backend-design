const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

// GET all products with search and pagination
router.get('/', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 8 } = req.query;
    let query = {};

    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error, please try again' });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error, please try again' });
  }
});

// POST create product - protected route (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, price, category, image, description, stock } = req.body;

    // Validate all fields
    if (!name || !price || !category || !image || !description || stock === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate name length
    if (name.trim().length < 2) {
      return res.status(400).json({ message: 'Product name must be at least 2 characters' });
    }

    // Validate price and stock
    if (Number(price) < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }
    if (Number(stock) < 0) {
      return res.status(400).json({ message: 'Stock cannot be negative' });
    }

    // Validate category
    const validCategories = ['tech', 'cloth', 'interior'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const product = new Product({
      name: name.trim(),
      price: Number(price),
      category,
      image,
      description: description.trim(),
      stock: Number(stock)
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

  } catch (err) {
    res.status(500).json({ message: 'Server error, please try again' });
  }
});

module.exports = router;