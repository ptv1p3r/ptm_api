'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTreeInterventions;

    /**
     * Interventions list
     */
    app.route('/api/v1/interventions/list').get(AuthenticateJWT, controller.listAll);

    /**
     * User group view by id
     */
    app.route('/api/v1/interventions/view/:interventionId').get(AuthenticateJWT, controller.viewUserTree);

    /**
     * User create new tree
     */
    app.route('/api/v1/interventions/create').post(AuthenticateJWT, controller.createUserTree);

    /**
     * Edit user tree
     */
    app.route('/api/v1/interventions/edit/:interventionId').put(AuthenticateJWT, controller.editUserTree);

    /**
     * Delete user group by id
     */
    app.route('/api/v1/interventions/delete/:interventionId').delete(AuthenticateJWT, controller.deleteUserTrees);

}
