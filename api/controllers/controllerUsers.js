'use strict';

const crypto = require('crypto');
const responseCode = require('../helpers/httpCodesDefinitions')
const modelUser = require('./../models/modelUsers')();
const emailController = require('./../helpers/email');

module.exports = app => {
    const controller = {};

    /**
     * User controller list all users
     * @param req
     * @param res
     * @returns {*}
     */
    controller.listAll = async (req, res) => {
        try {
            const result = await modelUser.usersListAll();

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                created: false,
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * User controller view user details
     * @param req
     * @param res
     * @returns {*}
     */
    controller.viewUser = (req, res) => {
        try {

            res.status(responseCode.SUCCESS_CODE.OK).json("View User");
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                created: false,
                code: error.code,
                message: error.text
            });
        }
    }

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

            await modelUser.createUser(userData)
                .then( async () => {
                    let info = await emailController.sendMail({
                        from: '"www.adoteumaarvore.pt 👻" <' + global.smtpUser + '>', // sender address
                        to: userData.email, // list of receivers
                        subject: "Hello ✔", // Subject line
                        template: 'email', // template to use
                        context:{
                            name: userData.name, // {{name}} with userData.name
                            company: "www.adoteumaarvore.pt" // {{company}}
                        },
                        //text: "Hello world?", // plain text body
                        //html: "<b>Hello world?</b>", // html body
                    });
                    console.log("mail: " + info.messageId);
                });

            res.status(responseCode.SUCCESS_CODE.CREATED).json({
                created: true
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
    controller.editUser = (req, res) => {
        try {

            res.status(responseCode.SUCCESS_CODE.OK).json("Edit User");
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                created: false,
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * User controller delete user
     * @param req
     * @param res
     */
    controller.deleteUser = (req, res) => {
        try {
            const userId = req.params.userId;

            res.status(responseCode.SUCCESS_CODE.OK).json("Delete User " + userId);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                created: false,
                code: error.code,
                message: error.text
            });
        }
    }

    return controller;
}


