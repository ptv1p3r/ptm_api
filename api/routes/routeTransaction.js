'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTransaction;

    /**
     * Transaction list
     */
    app.route('/api/v1/transaction/list').get(AuthenticateJWT, controller.listAll);

    /**
     * Transaction list by userid
     */
    app.route('/api/v1/transaction/list/:userId').get(AuthenticateJWT, controller.listAllUserTransactions);

    /**
     * Transaction view by id
     */
    app.route('/api/v1/transaction/view/:transactionId').get(AuthenticateJWT, controller.viewTransaction);

    /**
     * Create new transaction
     */
    app.route('/api/v1/transaction/create').post(AuthenticateJWT, controller.createTransaction);

    /**
     * Edit Transaction by id
     */
    app.route('/api/v1/transaction/edit/:transactionId').put(AuthenticateJWT, controller.editTransaction);

    /**
     * Delete Transaction by id
     */
    app.route('/api/v1/transaction/delete/:transactionId').delete(AuthenticateJWT, controller.deleteTransaction);

}
