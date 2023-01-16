const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

// initialize firebase
require('./firebaseConfig');

// middlewares
app.use(express.json({
    'limit': '10mb'
}));
app.use(cors());

// routes
const dishRoutes = require('./routes/dishesRoutes');
app.use("/dish", dishRoutes);
const orderRoutes = require('./routes/orderRoutes');
app.use("/order", orderRoutes);
const userRoutes = require('./routes/userRoutes');
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});