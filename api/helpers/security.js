const jwt           = require('jsonwebtoken');
const responseCode  = require('../helpers/httpCodesDefinitions');
const crypto        = require('crypto');
const algorithm     = 'aes-256-cbc'; //Using AES encryption

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

/**
 * Authentication of JWT Access Token
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function AuthenticateJWT(req, res, next) {
    const app = require('./../../config/express')();
    const tokenAccessSecret = app.get('token.accessSecret');

    try {
        const authHeader = req.headers['authorization'] ;

        if (authHeader == null) {
            return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                auth: false,
                message: "Authorization token not found!" });
        }

        const decoded = jwt.verify(authHeader, tokenAccessSecret);
        req.email = decoded.email;

        next();

    } catch (error) {
        return res.status(responseCode.ERROR_CODE.UNAUTHORIZED).json({
            auth: false,
            message: error.message });
    }
}

/**
 * Verification of JWT Refresh Token
 * @param {String} email
 * @param {String} refreshToken
 * @returns {boolean}
 */
function verifyRefreshJWT(email, refreshToken) {
    const app = require('./../../config/express')();
    const tokenRefreshSecret = app.get('token.refreshSecret');

    try {
        const decoded = jwt.verify(refreshToken, tokenRefreshSecret);

        return decoded.email === email;

    } catch (error) {
        return false;
    }
}

/**
 * Encrypt supplied text with aes-256-cbc algo function
 * @param {String} text - String to encrypt
 * @returns {{encryptedData: string, iv: string}}
 */
function encryptText(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
}

/**
 * Decrypt supplied text with aes-256-cbc algo function
 * @param {Object} text - Object to decrypt
 * @returns {string}
 */
function decryptText(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
module.exports = {
    AuthenticateJWT,
    verifyRefreshJWT,
    encryptText,
    decryptText,
}
