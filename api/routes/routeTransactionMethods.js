'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTransactionMethods;

    /**
     * Transaction methods list
     */
    app.route('/api/v1/transaction/methods/list').get(AuthenticateJWT, controller.listAll);
    app.route('/api/v1/transaction/methods/public/list').get(AuthenticateJWT, controller.listAllActive);

    /**
     * Transaction method view by id
     */
    app.route('/api/v1/transaction/methods/view/:transactionMethodId').get(AuthenticateJWT, controller.viewTransactionMethod);

    /**
     * Create new transaction method
     */
    app.route('/api/v1/transaction/methods/create').post(AuthenticateJWT, controller.createTransactionMethod);

    /**
     * Edit Transaction method
     */
    app.route('/api/v1/transaction/methods/edit/:transactionMethodId').put(AuthenticateJWT, controller.editTransactionMethod);

    /**
     * Delete Transaction method by id
     */
    app.route('/api/v1/transaction/methods/delete/:transactionMethodId').delete(AuthenticateJWT, controller.deleteTransactionMethod);

}
