/**
 * HTTP SUCCESS CODES
 * @type {{CREATED: number, ACCEPTED: number, NO_CONTENT: number, OK: number}}
 */
const SUCCESS_CODE = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
}

/**
 * HTTP ERROR CODES
 * @type {{UNAUTHORIZED: number, BAD_REQUEST: number, NOT_FOUND: number, PAYMENT_REQUIRED: number, FORBIDDEN: number}}
 */
const ERROR_CODE = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
}

/**
 * HTTP SERVER ERROR CODES
 * @type {{INTERNAL_SERVER_ERROR: number, BAD_GATEWAY: number, SERVICE_UNAVAILABLE: number, NETWORK_AUTHENTICATION_REQUIRED: number}}
 */
const SERVER_CODE = {
    INTERNAL_SERVER_ERROR: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    NETWORK_AUTHENTICATION_REQUIRED: 511
}

/**
 * GENERIC MESSAGES
 * @type {{GENERIC: {INPUT_EXISTING_IMAGE: string}, ERROR: {NO_TRANSACTION_TYPE_FOUND: string, NO_TRANSACTION_FOUND: string, NO_TREE_FOUND: string, NO_TREE_TYPE_FOUND: string, NO_USER_FOUND: string, NO_USER_GROUP_FOUND: string, NO_DATA: string, NO_DATA_FOUND: string, NO_IMAGE_FOUND: string, NO_TRANSACTION_METHOD_FOUND: string, NO_SECURITY_GROUP_FOUND: string}}}
 */
const MESSAGE = {
    ERROR: {
        NO_DATA: 'No data',
        NO_DATA_FOUND: 'No data found',
        NO_IMAGE_FOUND: 'Enter existing image id!',
        NO_USER_FOUND: 'No user found!',
        NO_USER_GROUP_FOUND: 'No user group found!',
        NO_TREE_TYPE_FOUND: 'No tree type found!',
        NO_TREE_FOUND: 'No tree(s) found!',
        NO_TRANSACTION_TYPE_FOUND: 'No transaction type found!',
        NO_TRANSACTION_METHOD_FOUND: 'No transaction method found!',
        NO_TRANSACTION_FOUND: 'No transaction(s) found!',
        NO_SECURITY_GROUP_FOUND: 'No security group found!',
    },
    GENERIC: {
        INPUT_EXISTING_IMAGE: 'Enter existing image id!'
    }
}


module.exports = {
    SUCCESS_CODE,
    ERROR_CODE,
    SERVER_CODE,
    MESSAGE,
};
