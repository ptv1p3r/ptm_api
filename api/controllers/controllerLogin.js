module.exports = app => {
    const controller = {};

    controller.login = (req, res) => res.status(200).json("Login");
    controller.logout = (req, res) => res.status(200).json("Logout");
    controller.register = (req, res) => res.status(200).json("Register");

    return controller;
}
