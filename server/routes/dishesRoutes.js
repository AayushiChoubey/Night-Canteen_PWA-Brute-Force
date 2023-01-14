const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const { db } = require('../firebaseConfig');
const { collection, addDoc } = require("firebase/firestore");

// dishModel
// dishId
// dishName
// dishPrice
// dishImage

router.post('/add', async (req, res) => {
    try {
        const data = {};
        data['dishId'] = uuid.v4();
        data['dishName'] = req.body['dishName'];
        data['dishPrice'] = req.body['dishPrice'];

        try {
            const dish = await addDoc(collection(db, "dishes"), data)
            console.log(dish);
            res.status(200).json({
                'dish': dish
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                'message': 'Internal server error! Please try again later!'
            })
        }


    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': 'Internal server error! Please try again later!'
        })
    }
})

module.exports = router;