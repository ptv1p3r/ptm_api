'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTransaction;

    /**
     * Transaction methods list
     */
    app.route('/api/v1/transaction/list').get(AuthenticateJWT, controller.listAll);

    /**
     * Transaction view by id
     */
    app.route('/api/v1/transaction/view/:transactionTypeId').get(AuthenticateJWT, controller.viewTransaction);

    /**
     * Create new transaction
     */
    app.route('/api/v1/transaction/create').post(AuthenticateJWT, controller.createTransaction);

    /**
     * Edit Transaction
     */
    app.route('/api/v1/transaction/edit/:transactionId').put(AuthenticateJWT, controller.editTransaction);

    /**
     * Delete Transaction by id
     */
    app.route('/api/v1/transaction/types/delete/:transactionId').delete(AuthenticateJWT, controller.deleteTransaction);

}
