const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const exp = require("constants");



// dot env config
dotenv.config();

// mongoDB Connection
connectDB();


// Rest Object
const app = express();


// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



// routes
app.use('/api/v1', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/inventory', require('./routes/inventoryRoute'))
app.use('/api/v1/analytics', require('./routes/analyticsRoute'))
app.use('/api/v1/admin', require('./routes/adminRoutes'))


// STATIC FILES
app.use(express.static(path.join(__dirname, './client/build')))

// STATIC ROUTES
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
});

// Port
const PORT = process.env.PORT || 8080;




// listen
app.listen(PORT, () => {
    console.log(`Node server is running in ${process.env.DEV_NODE} mode on Port ${process.env.PORT}`.bgBlue.white);
});