module.exports = app => {
    const controller = app.controllers.controllerLogin;

    app.route('/api/v1/login').get(controller.login);
    app.route('/api/v1/logout').get(controller.logout);

}
