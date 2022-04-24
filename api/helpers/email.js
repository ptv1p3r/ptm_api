"use strict";

const hbs = require('nodemailer-express-handlebars');
const nodemailer = require("nodemailer");
const path = require('path');

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

/**
 * Express Handlebars options
 * @type {{viewEngine: {partialsDir: string, defaultLayout: boolean}, viewPath: string}}
 */
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./api/views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./api/views/'),
};

// Apply handlebars options to email transporter
emailController.use('compile', hbs(handlebarOptions));

module.exports = emailController;
