const express = require("express");
const router = express.Router();
const { db } = require('../firebaseConfig');
const { collection, getDocs, addDoc, updateDoc, query, where } = require("firebase/firestore");
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
                    console.log(order);
                    // add doc to orders collection
                    const data = {};
                    data['orderId'] = order['id'];
                    data['orderToken'] = Math.floor(1000 + Math.random() * 9000);
                    data['orderStatus'] = '0';
                    await addDoc(collection(db, "orders"), data);
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
            // update order status
            const q = query(collection(db, 'orders'), where("orderId", "==", razorpay_order_id));
            const querySnapshot = await getDocs(q);
            const requiredDocRef = querySnapshot.docs[0].ref;

            const data = {};
            data['orderStatus'] = '1';
            await updateDoc(requiredDocRef, data);
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

router.post('/changeOrderState', async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body;
        const q = query(collection(db, 'orders'), where("orderId", "==", orderId));
        const querySnapshot = await getDocs(q);
        const requiredDocRef = querySnapshot.docs[0].ref;
        const data = {};
        data['orderStatus'] = orderStatus;
        await updateDoc(requiredDocRef, data);
        res.status(200).json({ "message": "Order status updated!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "Internal server error! Please try again later." });
    }
})

module.exports = router;