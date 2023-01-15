const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const { db } = require('../firebaseConfig');
const { collection, addDoc, getDocs, deleteDoc, query, where, getDoc, doc, updateDoc } = require("firebase/firestore");

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
        data['dishImage'] = req.body['dishImage'];

        try {
            const dish = await addDoc(collection(db, "dishes"), data);
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
});

router.get('/getAll', async (req, res) => {
    try {
        const snapshot = await getDocs(collection(db, "dishes"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push(doc.data());
        });

        res.status(200).json({
            'dishes': data
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': 'Internal server error! Please try again later!'
        })
    }
})

router.post('/delete', async (req, res) => {
    try {
        const dishId = req.body['dishId'];
        // find and delete doc from firestore have field dishId


        const q = query(collection(db, 'dishes'), where("dishId", "==", dishId));
        const querySnapshot = await getDocs(q);
        const requiredDocRef = querySnapshot.docs[0].ref;
        await deleteDoc(requiredDocRef);

        res.status(200).json({
            'message': 'dish deleted successfully!'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': 'Internal server error! Please try again later!'
        })
    }
})

router.post('/editWithoutImage', async (req, res) => {
    try {
        const data = {};
        data['dishName'] = req.body['dishName'];
        data['dishPrice'] = req.body['dishPrice'];

        const dishId = req.body['dishId'];

        const q = query(collection(db, 'dishes'), where("dishId", "==", dishId));
        const querySnapshot = await getDocs(q);
        const requiredDocRef = querySnapshot.docs[0].ref;
        await updateDoc(requiredDocRef, data);

        res.status(200).json({
            'message': 'dish edited successfully!'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': 'Internal server error! Please try again later!'
        })
    }
});

router.post('/editImage', async (req, res) => {
    try {
        const data = {};
        data['dishImage'] = req.body['dishImage'];

        const dishId = req.body['dishId'];

        const q = query(collection(db, 'dishes'), where("dishId", "==", dishId));
        const querySnapshot = await getDocs(q);
        const requiredDocRef = querySnapshot.docs[0].ref;
        await updateDoc(requiredDocRef, data);

        res.status(200).json({
            'message': 'dish image updated successfully!'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': 'Internal server error! Please try again later!'
        })
    }
});

module.exports = router;