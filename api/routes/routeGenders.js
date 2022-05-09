'use strict';

module.exports = app => {
    const controller = app.controllers.controllerGenders;

    app.route('/api/v1/genders/list').get(controller.listAll);

}
