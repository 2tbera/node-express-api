'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8081;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', require('./routes/auth'));

const server = app.listen(port, function () {
    console.log('ExpressJS project Runs In : ');
});






// PORT
