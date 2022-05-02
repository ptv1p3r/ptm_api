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
    controller.viewUser = async (req, res) => {
        try {
            const userData = {
                email: req.params.userEmail.toLowerCase().trim()
            }

            const user = await modelUser.getUserByEmail(userData.email);

            res.status(responseCode.SUCCESS_CODE.OK).json(user);
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
                entity: req.body.entity === null ? null: req.body.entity.trim(),
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
                        subject: "New User ✔", // Subject line
                        template: 'newUser', // template to use
                        context:{
                            name: userData.name, // {{name}} with userData.name
                            domain: "www.adoteumaarvore.pt", // {{domain}}
                            activationLink: "http://127.0.0.1:5000/api/v1/register/" + userData.activationToken, // {{activationLink}}
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
    controller.editUser = async (req, res) => {
        try {
            const userData = {
                id: req.params.userId.trim(),
                name: req.body.name.trim(),
                entity: req.body.entity === null ? null : req.body.entity.trim(),
                password: req.body.password.trim(),
                groupId: req.body.groupId,
                dateBirth: new Date(req.body.dateBirth.trim()),
                address: req.body.address.trim(),
                codPost: req.body.codPost.trim(),
                genderId: req.body.genderId,
                locality: req.body.locality.trim(),
                mobile: req.body.mobile.trim(),
                nif: req.body.nif.trim(),
                countryId: req.body.countryId,
            }

            await modelUser.editUser(userData)

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
     * User controller delete user
     * @param req
     * @param res
     */
    controller.deleteUser = async (req, res) => {
        try {
            const userId = req.params.userId.trim();

            await modelUser.deleteUser(userId)

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


