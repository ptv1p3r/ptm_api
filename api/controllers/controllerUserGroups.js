'use strict';

const modelUserGroups = require('./../models/modelUserGroups')();

module.exports = app => {
    const controller = {};

    controller.listAll = (req, res) => res.status(200).json("List all Groups");
    controller.viewUserGroup = (req, res) => res.status(200).json("View Group");
    controller.createUserGroup = (req, res) => res.status(200).json("Create Group");
    controller.editUserGroup = (req, res) => res.status(200).json("Edit Group");
    controller.deleteUserGroup = (req, res) => res.status(200).json("Delete Group");

    return controller;
}
