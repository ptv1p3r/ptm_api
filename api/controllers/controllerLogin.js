'use strict';

module.exports = app => {
    const controller = {};

    /**
     * User controller login
     * @param req
     * @param res
     * @returns {*}
     */
    controller.login = (req, res) => res.status(200).json("Login");

    /**
     * User controller logout
     * @param req
     * @param res
     * @returns {*}
     */
    controller.logout = (req, res) => res.status(200).json("Logout");

    /**
     * User controller account activation
     * @param req
     * @param res
     * @returns {*}
     */
    controller.register = (req, res) => res.status(200).json("Register");

    return controller;
}
