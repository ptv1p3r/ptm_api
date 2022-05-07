'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTreeType;

    /**
     * Tree type list all
     */
    app.route('/api/v1/treetype/list').get(AuthenticateJWT, controller.listAll);

    /**
     * Tree type view by id
     */
    app.route('/api/v1/treetype/view/:treeTypeId').get(AuthenticateJWT, controller.viewTreeType);

    /**
     * Tree type create
     */
    app.route('/api/v1/treetype/create').post(AuthenticateJWT, controller.createTreeType);

    /**
     * Edit tree type
     */
    app.route('/api/v1/treetype/edit/:treeTypeId').put(AuthenticateJWT, controller.editTreeType);

    /**
     * Delete tree type by id
     */
    app.route('/api/v1/treetype/delete/:treeTypeId').delete(AuthenticateJWT, controller.deleteTreeType);

}
