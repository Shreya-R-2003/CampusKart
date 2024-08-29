const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.use(express.json());

router.post('/', async (req, res) => {
  try {
    const { name, description, price, image, flag, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      flag,
      category,
    });

    await newProduct.save();

    res.send({ status: 'ok', data: newProduct });
  } catch (error) {
    res.status(500).send({ status: 'error', data: error });
  }
});

module.exports = router;