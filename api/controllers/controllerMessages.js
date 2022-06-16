'use strict';

const responseCode = require('../helpers/httpCodesDefinitions');
const crypto = require("crypto");
const modelMessages = require('./../models/modelMessages')();
const modelUsers = require('./../models/modelUsers')();
const emailController = require('./../helpers/email');
const moment = require("moment");


module.exports = app => {
    const controller = {};

    /**
     * Lists all messages
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {
            const result = await modelMessages.messagesListAll();

            res.status(responseCode.SUCCESS_CODE.OK).json({
                messages: result,
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
     * Lists messages by userId
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAllById = async (req, res) => {
        try {
            const userId = req.params.userId.trim();

            const result = await modelMessages.getUserMessagesListById(userId);

            const countNotViewed = await modelMessages.getUserMessagesNotViewedById(userId);

            res.status(responseCode.SUCCESS_CODE.OK).json({
                messages: result,
                totalNotViewed: Number(countNotViewed[0].total),
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
     * Get message by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewMessage = async (req, res) => {
        try {
            const messageData = {
                id: req.params.messageId
            }

            const message = await modelMessages.getMessageById(messageData.id);
            if (message[0].receptionDate === null) {
                const messageUpdate = {
                    id: messageData.id,
                    body: {
                        receptionDate: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
                        dateModified: moment().utc().format("YYYY-MM-DD HH:mm:ss")
                    }
                }

                await modelMessages.editPatchMessage(messageUpdate);
            }

            res.status(responseCode.SUCCESS_CODE.OK).json(message);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Creates new message
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createMessage = async (req, res) => {
        try {

            const messageData = {
                id: crypto.randomUUID(),
                subject: req.body.subject.trim(),
                message: req.body.message.trim(),
                fromUser: req.body.fromUser.trim(),
                fromName: "",
                fromEmail: "",
                toUser: req.body.toUser.trim(),
                toName: "",
                toEmail: "",
                active: 1,
                dateCreated: new Date(),
                dateModified: new Date(),
            }

            // validate fromUser
            await validateUser(messageData.fromUser)
                .then( (fromUser) => {
                    messageData.fromName = fromUser.name;
                    messageData.fromEmail = fromUser.email;
                });

            // validate toUser
            await validateUser(messageData.toUser)
                .then( (toUser) => {
                    messageData.toName = toUser.name;
                    messageData.toEmail = toUser.email;
                });

            // create message and send notification email
            await modelMessages.createMessage(messageData)
                .then( async () => {
                    await emailController.sendMail({
                        from: '"www.adoteumaarvore.pt 👻" <' + global.smtpUser + '>', // sender address
                        to: messageData.toEmail, // list of receivers
                        subject: "New message received", // Subject line
                        template: 'newMessage', // template to use
                        context:{
                            domain: "www.adoteumaarvore.pt", // {{domain}}
                            name: messageData.toName, // {{name}}
                        },
                    }).then( async () => {
                        const messageUpdate = {
                            id: messageData.id,
                            body: {
                                notificationDate : moment().utc().format("YYYY-MM-DD HH:mm:ss"),
                                dateModified: moment().utc().format("YYYY-MM-DD HH:mm:ss")
                            }
                        }

                        await modelMessages.editPatchMessage(messageUpdate);
                    })
                });

            res.status(responseCode.SUCCESS_CODE.CREATED).json({
                created: true
            });

        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                created: false,
                code: error.errorResponse,
                message: error.errorMessage
            });
        }
    }

    /**
     * Delete tree by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteMessage = async (req, res) => {
        try {
            const messageId = req.params.messageId.trim();

            await modelMessages.deleteMessage(messageId)

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

/**
 * Validate user settings
 * - 404 if no user found
 * - 403 if user not active
 *
 * @param {String} userId
 * @returns {Promise<unknown>}
 */
function validateUser(userId) {
    return new Promise(async (resolve, reject) => {
        // validate user
        await modelUsers.getUserById(userId)
            .then( user => {
                if (!user) {
                    return reject({
                        errorResponse: responseCode.ERROR_CODE.NOT_FOUND,
                        errorMessage: 'User not found!'
                    });
                }

                if (user[0].active === 0) {
                    return reject({
                        errorResponse: responseCode.ERROR_CODE.FORBIDDEN,
                        errorMessage: 'User not active!'
                    });
                }

                return resolve(user[0]);
            })
    });
}
