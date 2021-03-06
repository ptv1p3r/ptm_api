const dotenv     = require('dotenv');
dotenv.config();

// NODE_CONFIG must be defined prior to require('config') so that it can override and create new data on default.json from .env file
process.env.NODE_CONFIG = `{
        "server": {
            "port":${process.env.NODE_PORT}
        },
        "database": {
            "host":"${process.env.DB_HOST}", 
            "port":${process.env.DB_PORT}, 
            "user":"${process.env.DB_USER}", 
            "password":"${process.env.DB_PASS}", 
            "name":"${process.env.DB_DATABASE}"
        },
        "email": {
            "default": {
                "smtpUser":"${process.env.SMTP_USER}",
                "smtpPass":"${process.env.SMTP_PASS}"
            }
        },
        "token": {
            "accessSecret":"${process.env.ACCESS_TOKEN_SECRET}",
            "refreshSecret":"${process.env.REFRESH_TOKEN_SECRET}"
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
    app.set('port', process.env.NODE_PORT || config.get('server.port'));
    app.set('server.name', config.get('server.name'));
    app.set('server.version', config.get('server.version'));
    global.databaseHost = config.get('database.host');
    global.databasePort = config.get('database.port');
    global.databaseUser = config.get('database.user');
    global.databasePass = config.get('database.password');
    global.databaseName = config.get('database.name');
    global.smtpHost = config.get('email.default.smtpHost');
    global.smtpPort = config.get('email.default.smtpPort');
    global.smtpUser = config.get('email.default.smtpUser');
    global.smtpPass = config.get('email.default.smtpPass');
    global.smtpSecure = config.get('email.default.smtpSecure');
    app.set('token.accessSecret', config.get('token.accessSecret'));
    app.set('token.accessValidity', config.get('token.accessValidity'));
    app.set('token.refreshSecret', config.get('token.refreshSecret'));
    app.set('token.refreshValidity', config.get('token.refreshValidity'));
    app.set('images.rootFolder', config.get('images.rootFolder'));
    app.set('images.uploadFolder', config.get('images.uploadFolder'));
    app.set('images.maxUploadFileSize', config.get('images.maxUploadFileSize'));

    // MIDDLEWARES
    // parse requests of content-type - application/json
    app.use(bodyParser.json());
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // set cors
    app.use(cors(corsOptions));
    // set public folder for getting images
    app.use('/api/v1/trees/image', express.static(config.get('images.rootFolder'))); // TODO Validate if endpoint can be in route a use static folder only here

    // APP Load files
    consign({cwd: 'api'})
        .then('models')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};
