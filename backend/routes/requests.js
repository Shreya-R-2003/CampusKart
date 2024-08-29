const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// GET /api/requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
});

// POST /api/requests
router.post('/', async (req, res) => {
  try {
    const { username, productname, description, requesttype, category } = req.body;
    const newRequest = new Request({
      username,
      productname,
      description,
      requesttype,
      category,
    });
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit request' });
  }
});

// DELETE /api/requests/:id
router.delete('/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    await Request.findByIdAndRemove(requestId);
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete request' });
  }
});

module.exports = router;