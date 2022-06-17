'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerTreeInterventions;

    /**
     * Interventions list
     */
    app.route('/api/v1/interventions/list').get(AuthenticateJWT, controller.listAll);

    /**
     * Interventions list by tree id
     */
    app.route('/api/v1/interventions/list/:treeId').get(AuthenticateJWT, controller.listAllByTreeId);

    /**
     * Intervention view by id
     */
    app.route('/api/v1/interventions/view/:interventionId').get(AuthenticateJWT, controller.viewIntervention);

    /**
     * Intervention create
     */
    app.route('/api/v1/interventions/create').post(AuthenticateJWT, controller.createIntervention);

    /**
     * Edit intervention
     */
    app.route('/api/v1/interventions/edit/:interventionId').put(AuthenticateJWT, controller.editPutIntervention);
    app.route('/api/v1/interventions/edit/:interventionId').patch(AuthenticateJWT, controller.editPatchIntervention);

    /**
     * Delete intervention by id
     */
    app.route('/api/v1/interventions/delete/:interventionId').delete(AuthenticateJWT, controller.deleteIntervention);

}
