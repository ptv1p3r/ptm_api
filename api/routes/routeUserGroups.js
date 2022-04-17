'use strict';

module.exports = app => {
    const controller = app.controllers.controllerUserGroups;

    app.route('/api/v1/groups/list').get(controller.listAll);
    app.route('/api/v1/groups/view').get(controller.viewUserGroup);
    app.route('/api/v1/groups/create').get(controller.createUserGroup);
    app.route('/api/v1/groups/edit').get(controller.editUserGroup);
    app.route('/api/v1/groups/delete').get(controller.deleteUserGroup);

}
