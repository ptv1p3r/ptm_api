'use strict';

const crypto = require('crypto');
const responseCode = require('../helpers/httpCodesDefinitions')
const modelUser = require('./../models/modelUsers')();

module.exports = app => {
    const controller = {};

    /**
     * User controller list all users
     * @param req
     * @param res
     * @returns {*}
     */
    controller.listAll = (req, res) => res.status(200).json("List all Users");

    /**
     * User controller view user details
     * @param req
     * @param res
     * @returns {*}
     */
    controller.viewUser = (req, res) => res.status(200).json("View User");

    /**
     * User controller create user
     * @param req
     * @param res
     */
    controller.createUser = async (req, res) => {
        const userData = {
            id: crypto.randomUUID(),
            name: req.body.name.trim(),
            entity: req.body.entity.trim(),
            email: req.body.email.trim().toLowerCase(),
            password: req.body.password.trim(),
            groupId: req.body.groupId,
            activationToken: crypto.createHash('md5').update(req.body.email.trim().toLowerCase()).digest('hex'),
            dateBirth: new Date(req.body.dateBirth.trim()),
            address: req.body.address.trim(),
            codPost: req.body.codPost.trim(),
            gender: req.body.gender.trim(),
            locality: req.body.locality.trim(),
            mobile: req.body.mobile.trim(),
            nif: req.body.nif.trim(),
            countryId: req.body.countryId,
            active: false,
            dateActivation: new Date(),
            dateCreated: new Date(),
            dateModified: new Date(),
            lastLogin: null
        }

        const result = await modelUser.createUser(userData);
        console.log(result);

        res.status(responseCode.SUCCESS_CODE.CREATED).json("Create User" + JSON.stringify(userData));
    }

    /**
     * User controller edit user
     * @param req
     * @param res
     * @returns {*}
     */
    controller.editUser = (req, res) => res.status(200).json("Edit User");

    /**
     * User controller delete user
     * @param req
     * @param res
     */
    controller.deleteUser = (req, res) => {
        const userId = req.params.userId;

        res.status(200).json("Delete User " + userId);
    }

    return controller;
}


