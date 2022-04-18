'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelCountries = require('./../models/modelCountries')();

module.exports = app => {
    const controller = {};

    controller.listAll = async (req, res) => {
        try {
            const result = await modelCountries.getCountriesList();

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
