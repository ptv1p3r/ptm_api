'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelUserGroups = require('./../models/modelUserGroups')();

module.exports = app => {
    const controller = {};

    /**
     * Lists all user groups
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
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

    /**
     * View a user group by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewUserGroup = async (req, res) => {
        try {
            const userGroupData = {
                id: req.params.groupId,
            }

            const result = await modelUserGroups.getUserGroupById(userGroupData.id);

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

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
                active: req.body.active
            }

            await modelUserGroups.createUserGroup(userGroupData);

            res.status(responseCode.SUCCESS_CODE.CREATED).json({
                created: true
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

    /**
     * Delete user group by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteUserGroup = async (req, res) => {
        try {
            const userGroupData = {
                id: req.params.groupId,
            }

            await modelUserGroups.deleteUserGroup(userGroupData);

            res.status(responseCode.SUCCESS_CODE.OK).json({
                deleted: true
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                deleted: false,
                code: error.code,
                message: error.text
            });
        }
    }

    return controller;
}
