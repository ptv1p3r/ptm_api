const jwt           = require('jsonwebtoken');
const app           = require('./../../config/express')();
const tokenSecret   = app.get('token_secret');
const responseCode  = require('../helpers/httpCodesDefinitions')

function AuthenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers['authorization'] ;

        if (authHeader == null) {
            return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({ auth: false, msg: "Token not found" });
        }

        const decoded = jwt.verify(authHeader, tokenSecret);
        req.email = decoded.email;

        next();

    } catch (error) {
        return res.status(responseCode.ERROR_CODE.UNAUTHORIZED).json({ auth: false, msg: error.message });
    }
}

function verifyRefresh(email, refreshToken) {
    try {
        const decoded = jwt.verify(refreshToken, "refreshSecret");
        return decoded.email === email;
    } catch (error) {
        return false;
    }
}

module.exports = { AuthenticateJWT, verifyRefresh }
