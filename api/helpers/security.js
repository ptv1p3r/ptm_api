const jwt           = require('jsonwebtoken');
const responseCode  = require('../helpers/httpCodesDefinitions')

/**
 * Authentication of JWT Access Token
 * @param req
 * @param res
 * @param next
 * @returns {*}
 * @constructor
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

module.exports = { AuthenticateJWT, verifyRefreshJWT }
