'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerUserTrees;

    /**
     * User trees list
     */
    app.route('/api/v1/user/trees/list').get(AuthenticateJWT, controller.listAll);

    /**
     * User trees list by id
     */
    app.route('/api/v1/user/trees/list/:userId').get(AuthenticateJWT, controller.listAllById);

    /**
     * User group view by id
     */
    app.route('/api/v1/user/trees/view/:userId/:treeId').get(AuthenticateJWT, controller.viewUserTree);

    /**
     * User create new tree
     */
    app.route('/api/v1/user/trees/create').post(AuthenticateJWT, controller.createUserTree);

    /**
     * Edit user tree
     */
    app.route('/api/v1/user/trees/edit/:userId/:treeId').put(AuthenticateJWT, controller.editUserTree);

    /**
     * Delete user group by id
     */
    app.route('/api/v1/user/trees/delete/:userId/:treeId').delete(AuthenticateJWT, controller.deleteUserTrees);

}
