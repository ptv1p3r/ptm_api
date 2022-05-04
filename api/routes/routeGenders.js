'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerGenders;

    app.route('/api/v1/genders/list').get(AuthenticateJWT, controller.listAll);

}
