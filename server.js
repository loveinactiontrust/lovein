const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay instance with your credentials
const razorpay = new Razorpay({
  key_id: 'rzp_test_UOA2eVgbjDnH9A', // Replace with your Razorpay key_id
  key_secret: 'UH0FIUp8gDfy5Lpuoc0GcGTf', // Replace with your Razorpay key_secret
});

// Route to create Razorpay order
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create Razorpay order with the specified amount (converted to paise)
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert INR to paisen
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    // Send the created order details back to the frontend
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
