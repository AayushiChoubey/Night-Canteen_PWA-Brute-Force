const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

// initialize firebase
require('./firebaseConfig');

// middlewares
app.use(express.json());
app.use(cors());

// routes
const dishRoutes = require('./routes/dishesRoutes');
app.use("/dish", dishRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});