'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelUserGroups = require('./../models/modelUserGroups')();

module.exports = app => {
    const controller = {};

    controller.listAll = async (req, res) => {
        try {

            const result = await modelUserGroups.getUserGroupList();

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    controller.viewUserGroup = (req, res) => res.status(200).json("View Group");

    /**
     * Creates new user group
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createUserGroup = async (req, res) => {
        try {
            const userGroupData = {
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                securityId: req.body.securityId,
                active: req.body.active.trim(),
                dateCreated: new Date(),
                dateModified: new Date()
            }

            const result = await modelUserGroups.createUserGroup(userGroupData);

            res.status(responseCode.SUCCESS_CODE.CREATED).json({
                created: true,
                message: JSON.stringify(result)
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                created: false,
                code: error.code,
                message: error.text
            });
        }
    }

    controller.editUserGroup = (req, res) => res.status(200).json("Edit Group");
    controller.deleteUserGroup = (req, res) => res.status(200).json("Delete Group");

    return controller;
}
