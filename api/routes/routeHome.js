module.exports = app => {
    const controller = app.controllers.controllerHome;

    app.route('/').get(controller.defaultHome);
    app.route('/api/').get(controller.defaultHome);
    app.route('/api/v1/').get(controller.defaultHome);
}
