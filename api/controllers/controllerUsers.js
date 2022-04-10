const mariadb    = require('mariadb');
const crypto = require('crypto');
const responseCode = require('../helpers/httpCodesDefinitions')

module.exports = app => {
    const controller = {};

    controller.listAll = (req, res) => res.status(200).json("List all Users");
    controller.viewUser = (req, res) => res.status(200).json("View User");

    controller.createUser = (req, res) => {
        const userData = {
            id: crypto.randomUUID(),
            name: req.body.name.trim(),
            email: req.body.email.trim().toLowerCase(),
            password: req.body.password.trim(),
            groupId: req.body.groupId,
            address: req.body.address.trim(),
            codPost: req.body.codPost.trim(),
            mobile: req.body.mobile.trim(),
            nif: req.body.nif.trim(),
            country: req.body.country.trim(),
            active: false,
            dateCreated: new Date(),
            dateModified: new Date(),
            lastLogin:""
        }

        res.status(responseCode.SUCCESS_CODE.CREATED).json("Create User" + JSON.stringify(userData));
    }

    controller.editUser = (req, res) => res.status(200).json("Edit User");

    controller.deleteUser = (req, res) => {
        const userId = req.params.userId;

        res.status(200).json("Delete User " + userId);
    }

    return controller;
}
