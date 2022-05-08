'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTrees;

    /**
     * List all trees
     */
    app.route('/api/v1/trees/list').get(AuthenticateJWT, controller.listAll);

    /**
     * View tree by id
     */
    app.route('/api/v1/trees/view/:treeId').get(AuthenticateJWT, controller.viewTree);

    /**
     * Create a new tree
     */
    app.route('/api/v1/trees/create').post(AuthenticateJWT, controller.createTree);

    /**
     * Edit a tree by id
     */
    app.route('/api/v1/trees/edit/:treeId').put(AuthenticateJWT, controller.editTree);

    /**
     * Delete a tree by id
     */
    app.route('/api/v1/trees/delete/:treeId').delete(AuthenticateJWT, controller.deleteTree);

}
