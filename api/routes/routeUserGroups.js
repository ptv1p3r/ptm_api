'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerUserGroups;

    /**
     * User groups list
     */
    app.route('/api/v1/groups/list').get(AuthenticateJWT, controller.listAll);

    /**
     * User group view by id
     */
    app.route('/api/v1/groups/view/:groupId').get(AuthenticateJWT, controller.viewUserGroup);

    /**
     * User create new group
     */
    app.route('/api/v1/groups/create').post(AuthenticateJWT, controller.createUserGroup);

    /**
     * Edit user group
     */
    app.route('/api/v1/groups/edit/:groupId').put(AuthenticateJWT, controller.editUserGroup);

    /**
     * Delete user group by id
     */
    app.route('/api/v1/groups/delete/:groupId').delete(AuthenticateJWT, controller.deleteUserGroup);

}
