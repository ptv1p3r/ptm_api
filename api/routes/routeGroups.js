module.exports = app => {
    const controller = app.controllers.controllerGroups;

    app.route('/api/v1/groups/list').get(controller.listAll);
    app.route('/api/v1/groups/view').get(controller.viewGroup);
    app.route('/api/v1/groups/create').get(controller.createGroup);
    app.route('/api/v1/groups/edit').get(controller.editGroup);
    app.route('/api/v1/groups/delete').get(controller.deleteGroup);

}
