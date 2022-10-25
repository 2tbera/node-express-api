require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8081;

const {ErrorHandler} = require('./middlewares/errorhandler')
const {createDatabase} = require('./core/databaseConfig')

const main = async () => {

    await createDatabase()

    // Middlewares
    app.use(express.json());
    app.use(cors());

    // Routes
    app.use('/auth', require('./routes/auth'));
    app.use(ErrorHandler);

    const server = app.listen(port, () => {
        console.log('ExpressJS project Runs In : ');
    });
}

main()
