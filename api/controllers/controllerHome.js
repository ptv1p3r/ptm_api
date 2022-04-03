module.exports = app => {
    const controller = {};

    controller.defaultHome = (req, res) => res.status(200).json("Project Tree Management REST API v1.0");

    return controller;
}
