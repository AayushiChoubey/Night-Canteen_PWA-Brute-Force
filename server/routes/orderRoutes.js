const express = require("express");
const router = express.Router();
const { db } = require('../firebaseConfig');
const { collection, getDocs, addDoc } = require("firebase/firestore");
const crypto = require('crypto');
const uuid = require('uuid');

// orderModel
// orderId
// orderToken
// orderStatus

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
            // add doc to orders collection
            const data = {};
            data['orderId'] = uuid.v4();
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            console.log(randomNumber);
            data['orderToken'] = randomNumber;
            data['orderStatus'] = '0';
            await addDoc(collection(db, "orders"), data);
            res.status(200).json({ "message": "Payment successful!" });
        } else {
            res.status(401).json({ "message": "Payment failed!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "Internal server error! Please try again later." });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const snapshot = await getDocs(collection(db, "orders"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push(doc.data());
        });

        res.status(200).json({
            'orders': data
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "Internal server error! Please try again later." });
    }
});

module.exports = router;