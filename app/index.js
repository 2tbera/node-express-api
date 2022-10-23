'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8081;
require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', require('./routes/auth'));

const server = app.listen(port,  () => {
    console.log('ExpressJS project Runs In : ');
});






// PORT
