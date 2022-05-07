'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelTrees = require('./../models/modelTrees')();

module.exports = app => {
    const controller = {};

    controller.listAll = (req, res) => res.status(200).json("List all Trees");
    controller.viewTree = (req, res) => res.status(200).json("View Tree");
    controller.createTree = (req, res) => res.status(200).json("Create Tree");
    controller.editTree = (req, res) => res.status(200).json("Edit Tree");
    controller.deleteTree = (req, res) => res.status(200).json("Delete Tree");

    return controller;
}
