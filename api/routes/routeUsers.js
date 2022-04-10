module.exports = app => {
    const controller = app.controllers.controllerUsers;

    /**
     * Users list endpoint
     */
    app.route('/api/v1/users/list').get(controller.listAll);

    /**
     * User details endpoint
     */
    app.route('/api/v1/users/view/:userId').get(controller.viewUser);

    /**
     * User creation endpoint
     */
    app.route('/api/v1/users/create').post(controller.createUser);

    /**
     * User update endpoint
     */
    app.route('/api/v1/users/edit//:userId').get(controller.editUser);

    /**
     * User deletion endpoint
     */
    app.route('/api/v1/users/delete/:userId').delete(controller.deleteUser);

}
