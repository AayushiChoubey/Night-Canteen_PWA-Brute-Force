const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.get('/', (req, res) => {
    res.status(200).json({
        'message': 'It worked!'
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});