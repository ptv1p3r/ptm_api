'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerMessages;

    /**
     * list all messages
     */
    app.route('/api/v1/messages/list').get(AuthenticateJWT, controller.listAll);

    /**
     * Message list by userId
     */
    app.route('/api/v1/messages/list/:userId').get(AuthenticateJWT, controller.listAllById);

    /**
     * Message sent list by userId
     */
    app.route('/api/v1/messages/list/send/:userId').get(AuthenticateJWT, controller.listAllSentById);

    /**
     * Message set state read by id
     */
    app.route('/api/v1/messages/state/read/:messageId').post(AuthenticateJWT, controller.changeMessageStateRead);

    /**
     * Message set state unread by id
     */
    app.route('/api/v1/messages/state/unread/:messageId').post(AuthenticateJWT, controller.changeMessageStateUnRead);

    /**
     * View message by id
     */
    app.route('/api/v1/messages/view/:messageId').get(AuthenticateJWT, controller.viewMessage);

    /**
     * Create a new message
     */
    app.route('/api/v1/messages/create').post(AuthenticateJWT, controller.createMessage);

    /**
     * Delete a message by id
     */
    app.route('/api/v1/messages/delete/:messageId').delete(AuthenticateJWT, controller.deleteMessage);

}
