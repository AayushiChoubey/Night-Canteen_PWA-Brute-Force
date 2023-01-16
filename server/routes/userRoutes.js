const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

// userModel
// userId
// userName
// userType

const generateJWTToken = (userId, userName, userEmail, userType) => {
    return jwt.sign({ userId, userName, userEmail, userType }, process.env.JWT_SECRET_KEY);
}

router.post('/generateJWTToken', async (req, res) => {
    try {
        const userId = req.body['userId'];
        const userName = req.body['userName'];
        const userEmail = req.body['userEmail'];
        const token = generateJWTToken(userId, userName, userEmail, '0');
        const userData = {};
        userData['userId'] = userId;
        userData['userName'] = userName;
        userData['userEmail'] = userEmail;
        userData['userType'] = '0';
        userData['token'] = token;
        res.status(200).json({ userData: userData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "Internal server error! Please try again later." });
    }
});

module.exports = router;