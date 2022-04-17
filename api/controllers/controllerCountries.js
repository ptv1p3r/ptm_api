'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelCountries = require('./../models/modelCountries')();

module.exports = app => {
    const controller = {};

    controller.listAll = async (req, res) => {

        const result = await modelCountries.getCountriesList();
        console.log(result);

        res.status(responseCode.SUCCESS_CODE.OK).json(result);
    }

    return controller;
}
