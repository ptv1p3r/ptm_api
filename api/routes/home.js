module.exports = app => {
    const controller = app.controllers.defaultHome;

    app.route('/').get(controller.defaultHome);
    app.route('/api/v1/').get(controller.defaultHome);
}
