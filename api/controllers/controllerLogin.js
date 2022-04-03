module.exports = app => {
    const controller = {};

    controller.login = (req, res) => res.status(200).json("Login");
    controller.logout = (req, res) => res.status(200).json("Logout");

    return controller;
}
