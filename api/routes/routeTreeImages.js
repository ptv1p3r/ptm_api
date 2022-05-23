'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTreeImages;

    /**
     * list all tree images
     */
    app.route('/api/v1/trees/image/list').get( controller.listAll);

    /**
     * list tree images by id
     */
    app.route('/api/v1/trees/image/list/:treeId').get( controller.listByTreeId);

    /**
     * Upload tree image
     */
    app.route('/api/v1/trees/image/upload/:treeId').post( controller.uploadImage.single("file"), controller.uploadFile);

    /**
     * Delete a tree image by id
     */
    app.route('/api/v1/trees/image/delete/:imageId').delete( controller.deleteTreeImage);

}
