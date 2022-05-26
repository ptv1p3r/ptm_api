'use strict';

const { AuthenticateJWT } = require("../helpers/security")

module.exports = app => {
    const controller = app.controllers.controllerSecurity;

    /**
     * Security groups list
     */
    app.route('/api/v1/security/list').get(AuthenticateJWT, controller.listAll);

    /**
     * Security group view by id
     */
    app.route('/api/v1/security/view/:securityId').get(AuthenticateJWT, controller.viewSecurityGroup);

    /**
     * Security create new group
     */
    app.route('/api/v1/security/create').post(AuthenticateJWT, controller.createSecurityGroup);

    /**
     * Edit security group
     */
    app.route('/api/v1/security/edit/:securityId').put(AuthenticateJWT, controller.editPutSecurityGroup);
    app.route('/api/v1/security/edit/:securityId').patch(AuthenticateJWT, controller.editPatchSecurityGroup);

    /**
     * Delete security group by id
     */
    app.route('/api/v1/security/delete/:securityId').delete(AuthenticateJWT, controller.deleteSecurityGroup);

}
