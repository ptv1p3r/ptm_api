'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerMessages;

    /**
     * list all messages
     */
    app.route('/api/v1/messages/list').get( controller.listAll);

    /**
     * Message list by userId
     */
    app.route('/api/v1/messages/list/:userId').get( controller.listAllById);

    /**
     * View message by id
     */
    app.route('/api/v1/messages/view/:messageId').get( controller.viewMessage);

    /**
     * Create a new message
     */
    app.route('/api/v1/messages/create').post( controller.createMessage);

    /**
     * Delete a message by id
     */
    app.route('/api/v1/messages/delete/:messageId').delete( controller.deleteMessage);

}
