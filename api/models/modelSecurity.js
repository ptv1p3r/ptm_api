'use strict';

const { dbPool } = require('./../helpers/db');
const {buildPatchSqlQuery} = require("../helpers/db");

module.exports = app => {
    const model = {};

    /**
     * Get security group by id
     * @param {Integer} securityId - Security unique identifier
     * @returns {Promise<*>}
     */
    model.getSecurityGroupById = async (securityId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`SELECT id, homeLogin, admLogin,
                usersCreate, usersRead, usersUpdate, usersDelete,
                userGroupsCreate, userGroupsRead, userGroupsUpdate, userGroupsDelete,
                usersTreesCreate, usersTreesRead, usersTreesUpdate, usersTreesDelete,
                treesCreate, treesRead, treesUpdate, treesDelete,
                treeTypeCreate, treeTypeRead, treeTypeUpdate, treeTypeDelete,
                treeImagesCreate, treeImagesRead, treeImagesUpdate, treeImagesDelete,
                CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, 
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified 
                FROM security WHERE id=${securityId}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Lists security groups
     * @returns {Promise<void>}
     */
    model.getSecurityGroupList = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("SELECT id, homeLogin, admLogin, usersCreate, usersRead, usersUpdate, usersDelete, " +
                "userGroupsCreate, userGroupsRead, userGroupsUpdate, userGroupsDelete, " +
                "usersTreesCreate, usersTreesRead, usersTreesUpdate, usersTreesDelete, " +
                "treesCreate, treesRead, treesUpdate, treesDelete, " +
                "treeTypeCreate, treeTypeRead, treeTypeUpdate, treeTypeDelete, " +
                "treeImagesCreate, treeImagesRead, treeImagesUpdate, treeImagesDelete, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified " +
                "FROM security");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new security group
     * @param {Object} securityGroupData - Security group details
     * @returns {Promise<void>}
     */
    model.createSecurityGroup = async (securityGroupData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("INSERT INTO security (homeLogin, admLogin, usersCreate, usersRead, usersUpdate, usersDelete, " +
                "userGroupsCreate, userGroupsRead, userGroupsUpdate, userGroupsDelete, " +
                "usersTreesCreate, usersTreesRead, usersTreesUpdate, usersTreesDelete, " +
                "treesCreate, treesRead, treesUpdate, treesDelete, " +
                "treeTypeCreate, treeTypeRead, treeTypeUpdate, treeTypeDelete, " +
                "treeImagesCreate, treeImagesRead, treeImagesUpdate, treeImagesDelete) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [securityGroupData.homeLogin, securityGroupData.admLogin, securityGroupData.usersCreate, securityGroupData.usersRead,
                    securityGroupData.usersUpdate, securityGroupData.usersDelete, securityGroupData.userGroupsCreate, securityGroupData.userGroupsRead,
                    securityGroupData.userGroupsUpdate, securityGroupData.userGroupsDelete, securityGroupData.usersTreesCreate, securityGroupData.usersTreesRead,
                    securityGroupData.usersTreesUpdate, securityGroupData.usersTreesDelete, securityGroupData.treesCreate, securityGroupData.treesRead, securityGroupData.treesUpdate,
                    securityGroupData.treesDelete, securityGroupData.treeTypeCreate, securityGroupData.treeTypeRead, securityGroupData.treeTypeUpdate, securityGroupData.treeTypeDelete,
                    securityGroupData.treeImagesCreate, securityGroupData.treeImagesRead, securityGroupData.treeImagesUpdate, securityGroupData.treeImagesDelete]);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit PUT security group
     * @param {Object} securityGroupData - Security group details
     * @returns {*}
     */
    model.editPutSecurityGroup = async (securityGroupData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`UPDATE security SET homeLogin=${securityGroupData.homeLogin}, admLogin=${securityGroupData.admLogin},
                usersCreate=${securityGroupData.usersCreate}, usersRead=${securityGroupData.usersRead}, usersUpdate=${securityGroupData.usersUpdate}, usersDelete=${securityGroupData.usersDelete},
                userGroupsCreate=${securityGroupData.userGroupsCreate}, userGroupsRead=${securityGroupData.userGroupsRead}, userGroupsUpdate=${securityGroupData.userGroupsUpdate}, userGroupsDelete=${securityGroupData.userGroupsDelete},
                usersTreesCreate=${securityGroupData.usersTreesCreate}, usersTreesRead=${securityGroupData.usersTreesRead}, usersTreesUpdate=${securityGroupData.usersTreesUpdate}, usersTreesDelete=${securityGroupData.usersTreesDelete},
                treesCreate=${securityGroupData.treesCreate}, treesRead=${securityGroupData.treesRead}, treesUpdate=${securityGroupData.treesUpdate}, treesDelete=${securityGroupData.treesDelete},
                treeTypeCreate=${securityGroupData.treeTypeCreate}, treeTypeRead=${securityGroupData.treeTypeRead}, treeTypeUpdate=${securityGroupData.treeTypeUpdate}, treeTypeDelete=${securityGroupData.treeTypeDelete},
                treeImagesCreate=${securityGroupData.treeImagesCreate}, treeImagesRead=${securityGroupData.treeImagesRead}, treeImagesUpdate=${securityGroupData.treeImagesUpdate}, treeImagesDelete=${securityGroupData.treeImagesDelete},
                dateModified=NOW() 
                WHERE id=${securityGroupData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit PATCH security group
     * @param {Object} securityGroupData - Security group details
     * @returns {Promise<any>}
     */
    model.editPatchSecurityGroup = async (securityGroupData) => {
        let conn;

        try {

            conn = await dbPool.getConnection();

            return await conn.query(buildPatchSqlQuery('security',securityGroupData.id, securityGroupData.body));

        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Delete security group
     * @param {Object} securityGroupData - Security group details
     * @returns {*}
     */
    model.deleteSecurityGroup = async (securityGroupData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM security WHERE id=${securityGroupData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
