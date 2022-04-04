module.exports = app => {
    const controller = app.controllers.controllerUsers;

    app.route('/api/v1/users/list').get(controller.listAll);
    app.route('/api/v1/users/view').get(controller.viewUser);
    app.route('/api/v1/users/create').get(controller.createUser);
    app.route('/api/v1/users/edit').get(controller.editUser);
    app.route('/api/v1/users/delete').get(controller.deleteUser);

}
