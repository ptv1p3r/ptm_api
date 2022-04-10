const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const consign    = require('consign');
const cors       = require("cors");
const jwt        = require('jsonwebtoken');

const corsOptions = {
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
};

module.exports = () => {
    const app = express();

    // VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || config.get('server.port'));

    // MIDDLEWARES
    // parse requests of content-type - application/json
    app.use(bodyParser.json());
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // set cors
    app.use(cors(corsOptions));

    // ENDPOINTS
    consign({cwd: 'api'})
        .then('data')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};
