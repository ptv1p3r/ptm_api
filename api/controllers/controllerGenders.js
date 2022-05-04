'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelGenders = require('./../models/modelGenders')();

module.exports = app => {
    const controller = {};

    controller.listAll = async (req, res) => {
        try {
            const result = await modelGenders.getGendersList();

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    return controller;
}
