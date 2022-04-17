'use strict';

const jwt = require('jsonwebtoken');
const responseCode = require('../helpers/httpCodesDefinitions')
const { verifyRefreshJWT } = require("../helpers/security")
const modelUser = require('./../models/modelUsers')();

module.exports = app => {
    const controller = {};

    /**
     * User controller login returning access and refresh token
     * @param req
     * @param res
     * @returns {*}
     */
    controller.login = async (req, res) => {

        try{
            const userData = {
                email: req.body.email.trim().toLowerCase(),
                password: req.body.password.trim()
            }
            //const { email, password } = req.body;

            if (!userData.email || !userData.password) {
                return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                    auth: false,
                    error: "Enter valid authorization credentials!"
                });
            }

            const user = await modelUser.getUserByEmail(userData.email);

            if (user.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                auth: false,
                error: "Enter valid authorization credentials!"
            });

            if(user[0].password !== userData.password) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                auth: false,
                error: "Enter valid authorization credentials!"
            });

            if(user[0].active !== true) return res.status(responseCode.ERROR_CODE.FORBIDDEN).json({
                auth: false,
                error: "User not active!"
            });

            const accessToken = jwt.sign({email: userData.email}, app.get('token.accessSecret'), {
                expiresIn: app.get('token.accessValidity'),
            });
            const refreshToken = jwt.sign({email: userData.email}, app.get('token.refreshSecret'), {
                expiresIn: app.get('token.refreshValidity'),
            });

            await modelUser.setUserLoginTime(user[0].id);

            res.status(responseCode.SUCCESS_CODE.OK).json({
                auth: true,
                accessToken: accessToken,
                refreshToken: refreshToken
            });

        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                login: false,
                code: error.code,
                message: error.text
            });
        }
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
