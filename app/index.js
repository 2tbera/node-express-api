require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const {ErrorHandler, use, throwError} = require('./middlewares/error-handler')
const {createDatabase} = require('./core/databaseConfig')
const {header} = require("express-validator");
const {authGuard} = require("./middlewares/auth-guard");
const methodOverride = require('method-override');

const main = async () => {

    await createDatabase()

    // Middlewares
    app.use(express.json());
    app.use(cors());

    app.use(methodOverride('_method'));

    // Routes
    app.use('/auth', require('./routes/auth'));

    app.use('/user',
        header('authorization').isLength({min: 1}),
        throwError,
        use(authGuard),
        require('./routes/user'));

    app.use('/file',
        header('authorization').isLength({min: 1}),
        throwError,
        use(authGuard),
        require('./routes/file'));

    app.use('/album',
        header('authorization').isLength({min: 1}),
        throwError,
        use(authGuard),
        require('./routes/album'));

    app.use('/music',
        header('authorization').isLength({min: 1}),
        throwError,
        use(authGuard),
        require('./routes/music'));

    // ErrorHandler
    app.use(ErrorHandler);

    const server = app.listen(port, () => {
        console.log('ExpressJS project Runs In : ');
    });
}

main()
