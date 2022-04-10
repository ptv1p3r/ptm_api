module.exports = app => {
    const controller = app.controllers.controllerLogin;

    app.route('/api/v1/login').post(controller.login);
    app.route('/api/v1/logout').get(controller.logout);
    app.route('/api/v1/register/:activationToken').get(controller.logout);

}
