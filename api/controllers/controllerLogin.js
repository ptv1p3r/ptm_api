'use strict';

const jwt = require('jsonwebtoken');
const responseCode = require('../helpers/httpCodesDefinitions')

module.exports = app => {
    const controller = {};

    /**
     * User controller login
     * @param req
     * @param res
     * @returns {*}
     */
    controller.login = (req, res) => {
        const { email } = req.body;

        if (!email) {
            return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({ auth: false, error: "enter valid credentials" });
        }

        const accessToken = jwt.sign({ email: email }, app.get('token.accessSecret'), {
            expiresIn: "2m",
        });

        const refreshToken = jwt.sign({ email: email }, app.get('token.refreshSecret'), {
            expiresIn: "10m",
        });

        res.status(responseCode.SUCCESS_CODE.OK).json({ auth: true, accessToken: accessToken, refreshToken: refreshToken });
    }

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
