const express = require("express");
const router = express.Router();
const { db } = require('../firebaseConfig');
const { collection, getDocs } = require("firebase/firestore");
const RazorPay = require('razorpay');
const crypto = require('crypto');

// orderModel
// orderId

// api route for order creation
router.post('/createPaymentOrder', async (req, res) => {
    try {
        const orderedDishes = req.body['orderedDishes'];

        const snapshot = await getDocs(collection(db, "dishes"));
        let totalAmount = 0;
        snapshot.forEach((doc) => {
            const dish = doc.data();
            const element = orderedDishes.find((element) => element['dishId'] === dish['dishId']);
            if (element) {
                totalAmount += dish['dishPrice'] * element['dishCount'];
            }
        });

        if (totalAmount >= 1) {
            const razorpayInstance = require('../razorpayConfig').instance;
            const options = {
                amount: totalAmount * 100,
                currency: "INR",
                receipt: crypto.randomBytes(16).toString('hex'),
            }
            razorpayInstance.orders.create(options, async (err, order) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ "message": "Internal server error! Please try again later." });
                } else {
                    res.status(200).json({ order, paymentKey: process.env.RAZORPAY_KEY_ID });
                }
            });
        } else {
            res.status(400).json({
                'message': 'Total amount should be greater than or equal to 100!'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': 'Internal server error! Please try again later!'
        })
    }
});

// api route for payment verification
router.post('/verifySubscriptionPayment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (expectedSign === razorpay_signature) {
            res.status(200).json({ "message": "Payment successful!" });
        } else {
            res.status(401).json({ "message": "Payment failed!" }); 
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "Internal server error! Please try again later." });
    }
});

module.exports = router;