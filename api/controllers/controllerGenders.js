'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelGenders = require('./../models/modelGenders')();

module.exports = app => {
    const controller = {};

    controller.listAll = async (req, res) => {
        try {
            const result = await modelGenders.getGendersList();

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_DATA_FOUND
            });

            res.status(responseCode.SUCCESS_CODE.OK).json({
                genders: result,
                total: result.length
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    return controller;
}
