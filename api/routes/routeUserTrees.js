'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerUserTrees;

    /**
     * User trees list
     */
    app.route('/api/v1/user/trees/list').get(AuthenticateJWT, controller.listAll);

    /**
     * User group view by id
     */
    //app.route('/api/v1/user/trees/view/:groupId').get(AuthenticateJWT, controller.viewUserGroup);

    /**
     * User create new tree
     */
    app.route('/api/v1/user/trees/create').post(AuthenticateJWT, controller.createUserTree);

    /**
     * Edit user group
     */
    //app.route('/api/v1/user/trees/edit/:groupId').put(AuthenticateJWT, controller.editUserGroup);

    /**
     * Delete user group by id
     */
    app.route('/api/v1/user/trees/delete/:userId/:treeId').delete(AuthenticateJWT, controller.deleteUserTrees);

}
