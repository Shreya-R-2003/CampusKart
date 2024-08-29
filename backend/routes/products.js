const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Get the category filter from query parameters

    let filter = {}; // Create an empty filter object

    if (category && category !== 'all') {
      filter.category = category; // Add the category filter to the filter object if it's not 'all'
    }

    await Product.find(filter)
      .then((data) => {
        res.send({ status: 'ok', data: data });
      })
      .catch((error) => {
        res.status(500).send({ status: 'error', data: error });
      });
  } catch (error) {
    res.status(500).send({ status: 'error', data: error });
  }
});

module.exports = router;