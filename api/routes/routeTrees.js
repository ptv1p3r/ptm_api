module.exports = app => {
    const controller = app.controllers.controllerTrees;

    app.route('/api/v1/trees/list').get(controller.listAll);
    app.route('/api/v1/trees/view').get(controller.viewTree);
    app.route('/api/v1/trees/create').get(controller.createTree);
    app.route('/api/v1/trees/edit').get(controller.editTree);
    app.route('/api/v1/trees/delete').get(controller.deleteTree);

}
