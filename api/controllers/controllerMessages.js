'use strict';

const responseCode = require('../helpers/httpCodesDefinitions');
const crypto = require("crypto");
const modelMessages = require('./../models/modelMessages')();
const fs = require('fs');
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
                fromUser: "",
                fromName: "",
                fromEmail: "",
                toUser: "",
                toName: "",
                toEmail: "",
                active: 1,
                dateCreated: new Date(),
                dateModified: new Date(),
            }

            await modelMessages.createMessage(messageData);

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
