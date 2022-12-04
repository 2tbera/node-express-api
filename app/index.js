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

    /**
     * @description Mysql and Mongodb connection // auto creation of mysql DB
    */
    await createDatabase()

    app.use(express.json());
    app.use(cors());
    app.use(methodOverride('_method'));
    
    /**
     * @description API auth Route 
        * @login POST @body email password
        * @registration POST @body firstname lastname age email password
        * @refreshToken GET @header refreshToken
     */ 
    app.use('/auth', require('./routes/auth'));

    /**
     * @description API user Route @header authorization
        * @userData GET
    */
    app.use('/user',
        header('authorization').isLength({min: 1}),
        throwError,
        use(authGuard),
        require('./routes/user'));

    /**
     * @description API file Route 
        * @upload POST upload @header authorization @body file
        * @files GET
        *   @filename @params filename
    */
    app.use('/file',
        require('./routes/file'));

    /**
     * @description API album Route @header authorization
        * @getAlbums GET  
        * @getUserAlbums POST @body id
        * @getById GET
        *   @id @params id
        * @create POST @body name
        * @addMusic POST
        *   @id @params id @body name
        * @update PUT @body id name
        * @remove DELETE @body id 
    */
    app.use('/album',
        header('authorization').isLength({min: 1}),
        throwError,
        use(authGuard),
        require('./routes/album'));

    /**
     * @description API music Route @header authorization 
        * @getAlbumsMusic GET @body id
        * @create POST @body name category file
        * @update PUT @body id name
        * @remove DELETE @body id 
    */   
    app.use('/music',
        header('authorization').isLength({min: 1}),
        throwError,
        use(authGuard),
        require('./routes/music'));

    /**
     * @description Global Error Handler Middleware
    */   
    app.use(ErrorHandler);

    const server = app.listen(port, () => {
        console.log('ExpressJS project Runs In : ');
    });
}

main()
