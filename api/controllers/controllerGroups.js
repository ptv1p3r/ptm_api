'use strict';

module.exports = app => {
    const controller = {};

    controller.listAll = (req, res) => res.status(200).json("List all Groups");
    controller.viewGroup = (req, res) => res.status(200).json("View Group");
    controller.createGroup = (req, res) => res.status(200).json("Create Group");
    controller.editGroup = (req, res) => res.status(200).json("Edit Group");
    controller.deleteGroup = (req, res) => res.status(200).json("Delete Group");

    return controller;
}
