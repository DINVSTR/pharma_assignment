const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/redirect-to-payment', (req, res) => {
    const { cart, token } = req.body;

    // Validate token
    if (token !== 'secureToken') {
        return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Save cart data to session or database (for simplicity, using a variable)
    const sessionCart = cart; // In real applications, store it in a session or DB

    // Redirect to payment page on Site B
    res.json({ redirectUrl: 'http://localhost:4000/payment?cart=' + encodeURIComponent(JSON.stringify(sessionCart)) });
});

app.post('/update-order-status', (req, res) => {
    const { orderId, status } = req.body;

    // Update order status in the database
    console.log('Order ID:', orderId, 'Status:', status);

    res.json({ success: true, message: 'Order status updated successfully' });
});

app.listen(3000, () => {
    console.log('Site A server is running on http://localhost:3000');
});
