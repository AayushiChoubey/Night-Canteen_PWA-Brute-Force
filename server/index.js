const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

// initialize firebase
const { db } = require('./firebaseConfig');
const { query, collection, getDocs } = require('firebase/firestore');

// middlewares
app.use(express.json({
    'limit': '10mb'
}));
app.use(cors());

// start the server
let server = require('http').createServer(app);
let io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', async (socket) => {
    const q = query(collection(db, 'dishes'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    socket.emit('dishes', data);

    const q2 = query(collection(db, 'orders'));
    const querySnapshot2 = await getDocs(q2);
    const data2 = [];
    querySnapshot2.forEach((doc) => {
        data2.push(doc.data());
    });
    socket.emit('orders', data2);
});


// routes
const dishRoutes = require('./routes/dishesRoutes');
app.use("/dish", dishRoutes(io));
const orderRoutes = require('./routes/orderRoutes');
app.use("/order", orderRoutes);
const userRoutes = require('./routes/userRoutes');
app.use("/user", userRoutes);

// start listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})