'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTreeImages;

    /**
     * list all tree images
     */
    app.route('/api/v1/trees/image/list').get(AuthenticateJWT, controller.listAll);

    /**
     * list tree images by id
     */
    app.route('/api/v1/trees/image/list/:treeId').get(AuthenticateJWT, controller.listByTreeId);

    /**
     * Upload tree image
     */
    app.route('/api/v1/trees/image/upload/:treeId').post(AuthenticateJWT, controller.uploadImage.single("file"), controller.uploadFile);

    /**
     * Delete a tree image by id
     */
    app.route('/api/v1/trees/image/delete/:imageId').delete(AuthenticateJWT, controller.deleteTreeImage);

}
