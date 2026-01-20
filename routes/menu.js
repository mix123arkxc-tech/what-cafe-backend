const express = require('express');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json({ success: true, menuItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/menu
// @desc    Add menu item (admin only)
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    const menuItem = await MenuItem.create({
      name,
      price,
      category,
      description
    });

    res.status(201).json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
