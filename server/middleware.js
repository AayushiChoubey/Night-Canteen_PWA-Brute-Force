const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
    const decryptedToken = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET_KEY);
    if (decryptedToken.userType === '1') {
        next();
    } else {
        res.status(403).json({ "message": "User not permitted to perform this operation!" });
    }
}

module.exports = { checkAdmin };