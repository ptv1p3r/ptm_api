const { check, validationResult } = require('express-validator');

const loginValidation = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]


module.exports = {
    loginValidation,
    validationResult
}
