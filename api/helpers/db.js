const mariadb = require('mariadb');

/**
 * Database pool
 * @type {Pool}
 */
const dbPool = mariadb.createPool({
    connectionLimit: 20,

    host: global.databaseHost,
    user: global.databaseUser,
    password: global.databasePass,
    database: global.databaseName,

    /*
    host: "localhost",
    user: "admin",
    password: "ptmadmin",
    database: "ptm",
    */
    timezone: "UTC",
    dateStrings: true

});

/**
 * Generic build sql expression for patch
 * @param table
 * @param id
 * @param data
 * @returns {string|null}
 */
const buildPatchSqlQuery = (table, id, data) => {
    if (Object.keys(data).length === 0) return null;

    let sql = `UPDATE ${table} SET`;

    Object.entries(data).forEach(([key, value]) => {
        const valueToSet = typeof data[key] === 'string' ? `'${value.trim()}'` : value;
        sql += ` ${key.trim()}=${valueToSet},`;
    });

    sql = sql.slice(0, -1); // Remove last ","
    sql += ` WHERE id='${id}';`;

    return sql;
}

module.exports = {
    dbPool,
    buildPatchSqlQuery
};
