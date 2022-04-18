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
        try {
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
                genderId: req.body.genderId,
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

            res.status(responseCode.SUCCESS_CODE.CREATED).json({
                created: true,
                message: JSON.stringify(result)
            });

        } catch (error) {
            /*"message": {
                "text": "Duplicate entry 'pedro.roldan@gmail.com' for key 'email'",
                    "sql": "INSERT INTO users value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) - parameters:['7bfe78b1-52a1-4e3e-969c-993c762c9760','Pedro Tiago de Jesus Estevanez Roldan','Camara Municipal de Monchique','pedro.roldan@gmail.com','xzckjzcxjvlcxzkvjcxl...]",
                    "fatal": false,
                    "errno": 1062,
                    "sqlState": "23000",
                    "code": "ER_DUP_ENTRY"
            }*/
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                created: false,
                code: error.code,
                message: error.text
            });
        }
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


