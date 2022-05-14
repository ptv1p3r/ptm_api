'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerLogin;

    /**
     * User login endpoint
     */
    app.route('/api/v1/login').post(controller.login);

    /**
     * User recover password endpoint
     */
    app.route('/api/v1/recover').post(controller.recover);

    /**
     * User recover activation endpoint
     */
    app.route('/api/v1/recover/id/:userId').post(controller.activation);

    /**
     * User logout endpoint
     */
    app.route('/api/v1/logout').get(AuthenticateJWT, controller.logout);

    /**
     * User account activation
     */
    app.route('/api/v1/register/:activationToken').get(controller.register);

    /**
     * User verify token using JWT Refresh Token
     */
    app.route('/api/v1/refresh').post(controller.refresh);

}
