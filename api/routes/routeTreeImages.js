'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTreeImages;

    /**
     * Upload tree image
     */
    app.route('/api/v1/trees/image/upload/:treeId').post( controller.uploadSettings.single("file"), controller.uploadFile);

    /**
     * Delete a tree by id
     */
    app.route('/api/v1/trees/delete/:treeId').delete(AuthenticateJWT, controller.deleteTree);

}
