'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTransactionTypes;

    /**
     * Transaction methods list
     */
    app.route('/api/v1/transaction/types/list').get(AuthenticateJWT, controller.listAll);

    /**
     * Transaction method view by id
     */
    app.route('/api/v1/transaction/types/view/:transactionTypeId').get(AuthenticateJWT, controller.viewTransactionType);

    /**
     * Create new transaction method
     */
    app.route('/api/v1/transaction/types/create').post(AuthenticateJWT, controller.createTransactionType);

    /**
     * Edit Transaction method
     */
    app.route('/api/v1/transaction/types/edit/:transactionTypeId').put(AuthenticateJWT, controller.editTransactionType);

    /**
     * Delete Transaction method by id
     */
    app.route('/api/v1/transaction/types/delete/:transactionTypeId').delete(AuthenticateJWT, controller.deleteTransactionType);

}
