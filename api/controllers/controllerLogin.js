'use strict';

const jwt = require('jsonwebtoken');
const responseCode = require('../helpers/httpCodesDefinitions')
const { verifyRefreshJWT } = require("../helpers/security")

module.exports = app => {
    const controller = {};

    /**
     * User controller login returning access and refresh token
     * @param req
     * @param res
     * @returns {*}
     */
    controller.login = (req, res) => {
        const { email } = req.body;

        if (!email) {
            return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                auth: false,
                error: "Enter valid authorization credentials!"
            });
        }

        const accessToken = jwt.sign({ email: email }, app.get('token.accessSecret'), {
            expiresIn: app.get('token.accessValidity'),
        });

        const refreshToken = jwt.sign({ email: email }, app.get('token.refreshSecret'), {
            expiresIn: app.get('token.refreshValidity'),
        });

        res.status(responseCode.SUCCESS_CODE.OK).json({
            auth: true,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }

    /**
     * User controller logout
     * @param req
     * @param res
     * @returns {*}
     */
    controller.logout = (req, res) => res.status(responseCode.SUCCESS_CODE.OK).json({
        auth: false,
        accessToken: null,
        refreshToken: null,
        message: "User logged out!"
    });

    /**
     * User controller account activation
     * @param req
     * @param res
     * @returns {*}
     */
    controller.register = (req, res) => res.status(200).json("Register");

    /**
     * User getting new access token using refresh token
     * @param req
     * @param res
     * @returns {*}
     */
    controller.refresh = (req, res) => {
        const { email, refreshToken } = req.body;

        const isValid = verifyRefreshJWT(email, refreshToken);

        if (!isValid) {
            return res.status(responseCode.ERROR_CODE.UNAUTHORIZED).json({
                auth: false,
                message: "Invalid token,login again!"
            });
        }

        const accessToken = jwt.sign({ email: email }, app.get('token.accessSecret'), {
            expiresIn: app.get('token.accessValidity'),
        });

        res.status(responseCode.SUCCESS_CODE.OK).json({
            auth: true,
            accessToken: accessToken
        });
    }

    return controller;
}
