const express = require('express');
const router = express.Router();
const Donate = require('../models/Donate');

// GET /api/donates
router.get('/', async (req, res) => {
  try {
    const donations = await Donate.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
});

// POST /api/donates
router.post('/', async (req, res) => {
  try {
    const { itemName, category, description, image } = req.body;
    const newDonation = new Donate({
      itemName,
      category,
      description,
      image,
    });
    await newDonation.save();
    res.status(201).json({ message: 'Item donated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to donate item' });
  }
});

module.exports = router;