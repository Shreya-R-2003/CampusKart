const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.use(express.json());

router.post("/", async (req, res) => {
    const orderDetails = req.body;
    const newOrder = new Order(orderDetails);
  
    newOrder.save()
      .then(() => {
        res.status(200).json({ message: 'Order placed successfully!' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while placing the order.' });
      });
  
});

// API Endpoint: /api/orders/:username
// router.get("/:username", async (req, res) => {
//   const loggedInUsername = req.params.username;

//   if (!loggedInUsername) {
//     return res.status(400).json({ error: 'No username provided.' });
//   }

//   Order.find({ username: loggedInUsername })
//     // .sort({ createdAt: -1 }) // Sort by creation timestamp in descending order
//     // .limit(1) // Limit the result to 1 order (the most recent)
//     .then((orders) => {
//       console.log(orders)
//       res.status(200).json({ order: orders }); // Send the most recent order
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred while fetching the order.' });
//     });
// });


module.exports = router;