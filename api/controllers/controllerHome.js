'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')

module.exports = app => {
    const controller = {};

    controller.defaultHome = (req, res) => res.status(responseCode.SUCCESS_CODE.OK).json("Project Tree Management REST API v1.0");

    return controller;
}
