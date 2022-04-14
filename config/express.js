const dotenv     = require('dotenv');
dotenv.config();

// NODE_CONFIG must be defined prior to require('config') so that it can override and create new data on default.json from .env file
process.env.NODE_CONFIG = `{
        "database": {
            "host":"${process.env.DB_HOST}", 
            "port":${process.env.DB_PORT}, 
            "user":"${process.env.DB_USER}", 
            "password":"${process.env.DB_PASS}", 
            "name":"${process.env.DB_DATABASE}"
        }
}`;
const config     = require('config');

const express    = require('express');
const bodyParser = require('body-parser');
const consign    = require('consign');
const cors       = require("cors");

const corsOptions = {
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
};

module.exports = () => {
    const app = express();

    // APP VARIABLES
    app.set('port', process.env.PORT || config.get('server.port'));
    app.set('database.host', config.get('database.host'));
    app.set('database.port', config.get('database.port'));
    app.set('database.user', config.get('database.user'));
    app.set('database.password', config.get('database.password'));
    app.set('database.name', config.get('database.name'));
    app.set('token_secret', config.get('token.secret'));

    // MIDDLEWARES
    // parse requests of content-type - application/json
    app.use(bodyParser.json());
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // set cors
    app.use(cors(corsOptions));

    // APP Load files
    consign({cwd: 'api'})
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};
