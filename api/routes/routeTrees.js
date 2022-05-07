'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTrees;

    app.route('/api/v1/trees/list').get(AuthenticateJWT, controller.listAll);

    app.route('/api/v1/trees/view/:treeId').get(AuthenticateJWT, controller.viewTree);

    app.route('/api/v1/trees/create').post(AuthenticateJWT, controller.createTree);

    app.route('/api/v1/trees/edit/:treeId').put(AuthenticateJWT, controller.editTree);

    app.route('/api/v1/trees/delete/:treeId').delete(AuthenticateJWT, controller.deleteTree);

}
