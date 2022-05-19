'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const emailController = require("../helpers/email");
const modelTreeImages = require('./../models/modelTreeImages')();
const fs = require('fs');
const multer = require("multer");

const maxSize = 8000000; // 8Mb

/**
 * Configuration for Multer
 * @type {DiskStorage}
 */
let multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `temp-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

/**
 * Multer Filter
 * @param req
 * @param file
 * @param cb
 */
let multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png") {
        cb(null, true);
    } else {
        cb(new Error("Not a valid file extension -> only JPG/JPEG/PNG File!!"), false);
    }
};

/**
 * Multer Settings
 * @type {Multer}
 */
const multerSettings = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: maxSize }
});

module.exports = app => {
    const controller = {};

    controller.uploadSettings = multerSettings;

    /**
     * Public lists all trees
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.publicList = async (req, res) => {
        try {
            const result = await modelTrees.treesPublicList();

            res.status(responseCode.SUCCESS_CODE.OK).json({
                trees: result,
                total: result.length
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Lists all trees
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {
            const result = await modelTrees.treesListAll();

            res.status(responseCode.SUCCESS_CODE.OK).json({
                trees: result,
                total: result.length
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Upload single tree image
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.uploadFile = async (req, res) => {
        try {
            console.log("treeId: " + req.params.treeId.trim());
            console.log("file: " + req.file);
            console.log("filename: " + req.file.filename);
            console.log("filepath: " + req.file.path);
            console.log("size: " + req.file.size);
            console.log("root: " + app.get('images.rootFolder'));
            console.log("upload: " + app.get('images.uploadFolder'));
            console.log("maxsize: " + app.get('images.maxUploadFileSize'));

            let dir = './api/public/files/' + req.params.treeId.trim();

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }

            // await modelTrees.createTree(treeData);
            fs.rename(req.file.path, './api/public/files/' + req.params.treeId.trim() + '/' + req.params.treeId.trim() + '.png', function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });

            // fs.copyFile('uploads/' + req.params.treeId.trim() + '.png', './api/public/files/' + req.params.treeId.trim() + '/' + req.params.treeId.trim() + '.png', (err) => {
            //     if (err) throw err;
            //     console.log('source.txt was copied to destination.txt');
            // });
            //
            // fs.unlinkSync('uploads/' + req.params.treeId.trim() + '.png');
            // fs.unlink('uploads/' + req.params.treeId.trim() + '.png', (err) => {
            //     if (err) {
            //         console.error(err)
            //         return
            //     }
            // })

            res.status(responseCode.SUCCESS_CODE.CREATED).json({
                uploaded: true
            });

        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                uploaded: false,
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Delete tree by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteTree = async (req, res) => {
        try {
            const treeId = req.params.treeId.trim();

            await modelTrees.deleteTree(treeId)

            res.status(responseCode.SUCCESS_CODE.OK).json({
                deleted: true
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                deleted: false,
                code: error.code,
                message: error.text
            });
        }
    }

    return controller;
}
