"use strict";
const nodemailer = require("nodemailer");

/**
 * Email transporter object
 *
 */
const emailController = nodemailer.createTransport({
    host: global.smtpHost,
    port: global.smtpPort,
    secure: global.smtpSecure, // true for 465, false for other ports
    auth: {
        user: global.smtpUser,
        pass: global.smtpPass,
    },
});

module.exports = emailController;
