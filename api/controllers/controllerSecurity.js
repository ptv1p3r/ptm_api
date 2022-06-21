'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelSecurity = require('./../models/modelSecurity')();

module.exports = app => {
    const controller = {};

    /**
     * Lists all security groups
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {

            const result = await modelSecurity.getSecurityGroupList();

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_DATA_FOUND
            });

            res.status(responseCode.SUCCESS_CODE.OK).json({
                security: result,
                total: result.length
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * View a security group by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewSecurityGroup = async (req, res) => {
        try {
            const securityGroupData = {
                id: req.params.securityId,
            }

            const result = await modelSecurity.getSecurityGroupById(securityGroupData.id);
            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: "Security group not found!"
            });

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Creates new security group
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createSecurityGroup = async (req, res) => {
        try {
            const securityGroupData = {
                homeLogin: req.body.homeLogin === true ? 1:0,
                admLogin: req.body.admLogin === true ? 1:0,
                usersCreate: req.body.usersCreate === true ? 1:0,
                usersRead: req.body.usersRead === true ? 1:0,
                usersUpdate: req.body.usersUpdate === true ? 1:0,
                usersDelete: req.body.usersDelete === true ? 1:0,
                userGroupsCreate: req.body.userGroupsCreate === true ? 1:0,
                userGroupsRead: req.body.userGroupsRead === true ? 1:0,
                userGroupsUpdate: req.body.userGroupsUpdate === true ? 1:0,
                userGroupsDelete: req.body.userGroupsDelete === true ? 1:0,
                usersTreesCreate: req.body.usersTreesCreate === true ? 1:0,
                usersTreesRead: req.body.usersTreesRead === true ? 1:0,
                usersTreesUpdate: req.body.usersTreesUpdate === true ? 1:0,
                usersTreesDelete: req.body.usersTreesDelete === true ? 1:0,
                treesCreate: req.body.treesCreate === true ? 1:0,
                treesRead: req.body.treesRead === true ? 1:0,
                treesUpdate: req.body.treesUpdate === true ? 1:0,
                treesDelete: req.body.treesDelete === true ? 1:0,
                treeTypeCreate: req.body.treeTypeCreate === true ? 1:0,
                treeTypeRead: req.body.treeTypeRead === true ? 1:0,
                treeTypeUpdate: req.body.treeTypeUpdate === true ? 1:0,
                treeTypeDelete: req.body.treeTypeDelete === true ? 1:0,
                treeImagesCreate: req.body.treeImagesCreate === true ? 1:0,
                treeImagesRead: req.body.treeImagesRead === true ? 1:0,
                treeImagesUpdate: req.body.treeImagesUpdate === true ? 1:0,
                treeImagesDelete: req.body.treeImagesDelete === true ? 1:0
            }

            await modelSecurity.createSecurityGroup(securityGroupData);

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

    /**
     * Edit PUT security group
     * @param req
     * @param res
     */
    controller.editPutSecurityGroup = async (req, res) => {
        try {
            const securityGroupData = {
                id: req.params.securityId,
                homeLogin: req.body.homeLogin === true ? 1:0,
                admLogin: req.body.admLogin === true ? 1:0,
                usersCreate: req.body.usersCreate === true ? 1:0,
                usersRead: req.body.usersRead === true ? 1:0,
                usersUpdate: req.body.usersUpdate === true ? 1:0,
                usersDelete: req.body.usersDelete === true ? 1:0,
                userGroupsCreate: req.body.userGroupsCreate === true ? 1:0,
                userGroupsRead: req.body.userGroupsRead === true ? 1:0,
                userGroupsUpdate: req.body.userGroupsUpdate === true ? 1:0,
                userGroupsDelete: req.body.userGroupsDelete === true ? 1:0,
                usersTreesCreate: req.body.usersTreesCreate === true ? 1:0,
                usersTreesRead: req.body.usersTreesRead === true ? 1:0,
                usersTreesUpdate: req.body.usersTreesUpdate === true ? 1:0,
                usersTreesDelete: req.body.usersTreesDelete === true ? 1:0,
                treesCreate: req.body.treesCreate === true ? 1:0,
                treesRead: req.body.treesRead === true ? 1:0,
                treesUpdate: req.body.treesUpdate === true ? 1:0,
                treesDelete: req.body.treesDelete === true ? 1:0,
                treeTypeCreate: req.body.treeTypeCreate === true ? 1:0,
                treeTypeRead: req.body.treeTypeRead === true ? 1:0,
                treeTypeUpdate: req.body.treeTypeUpdate === true ? 1:0,
                treeTypeDelete: req.body.treeTypeDelete === true ? 1:0,
                treeImagesCreate: req.body.treeImagesCreate === true ? 1:0,
                treeImagesRead: req.body.treeImagesRead === true ? 1:0,
                treeImagesUpdate: req.body.treeImagesUpdate === true ? 1:0,
                treeImagesDelete: req.body.treeImagesDelete === true ? 1:0
            }

            await modelSecurity.editPutSecurityGroup(securityGroupData);

            res.status(responseCode.SUCCESS_CODE.OK).json({
                updated: true
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                updated: false,
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Edit PATCH security group
     * @param req
     * @param res
     */
    controller.editPatchSecurityGroup = async (req, res) => {
        try {
            const securityGroupData = {
                id: req.params.securityId.trim(),
                body: req.body
            }

            await modelSecurity.editPatchSecurityGroup(securityGroupData);

            res.status(responseCode.SUCCESS_CODE.OK).json({
                updated: true
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                updated: false,
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Delete security group by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteSecurityGroup = async (req, res) => {
        try {
            const securityGroupData = {
                id: req.params.securityId,
            }

            await modelSecurity.deleteSecurityGroup(securityGroupData);

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
