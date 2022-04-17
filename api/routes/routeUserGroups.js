'use strict';

module.exports = app => {
    const controller = app.controllers.controllerUserGroups;

    app.route('/api/v1/groups/list').get(controller.listAll);
    app.route('/api/v1/groups/view/:groupId').get(controller.viewUserGroup);
    app.route('/api/v1/groups/create').post(controller.createUserGroup);
    app.route('/api/v1/groups/edit').post(controller.editUserGroup);
    app.route('/api/v1/groups/delete').delete(controller.deleteUserGroup);

}
