'use strict';

module.exports = app => {
    const controller = app.controllers.controllerCountries;

    app.route('/api/v1/countries/list').get(controller.listAll);

}
