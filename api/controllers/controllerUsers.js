module.exports = app => {
    const controller = {};

    controller.listAll = (req, res) => res.status(200).json("List all Users");
    controller.viewUser = (req, res) => res.status(200).json("View User");
    controller.createUser = (req, res) => res.status(200).json("Create User");
    controller.editUser = (req, res) => res.status(200).json("Edit User");
    controller.deleteUser = (req, res) => res.status(200).json("Delete User");

    return controller;
}
