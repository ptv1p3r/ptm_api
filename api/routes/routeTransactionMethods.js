'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTransactionMethods;

    /**
     * Transaction methods list
     */
    app.route('/api/v1/transaction/methods/list').get(AuthenticateJWT, controller.listAll);

    /**
     * User group view by id
     */
    app.route('/api/v1/transaction/methods/view/:groupId').get(AuthenticateJWT, controller.viewUserGroup);

    /**
     * Create new transaction method
     */
    app.route('/api/v1/transaction/methods/create').post(AuthenticateJWT, controller.createTransactionMethod);

    /**
     * Edit user group
     */
    app.route('/api/v1/transaction/methods/edit/:groupId').put(AuthenticateJWT, controller.editUserGroup);

    /**
     * Delete user group by id
     */
    app.route('/api/v1/transaction/methods/delete/:groupId').delete(AuthenticateJWT, controller.deleteUserGroup);

}
