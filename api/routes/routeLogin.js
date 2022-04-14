const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerLogin;

    /**
     * User login endpoint
     */
    app.route('/api/v1/login').post(controller.login);

    /**
     * User logout endpoint
     */
    app.route('/api/v1/logout').get(AuthenticateJWT, controller.logout);

    /**
     * User account activation
     */
    app.route('/api/v1/register/:activationToken').get(controller.register);

}
