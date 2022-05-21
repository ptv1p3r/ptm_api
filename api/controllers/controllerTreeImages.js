'use strict';

const responseCode = require('../helpers/httpCodesDefinitions');
const crypto = require("crypto");
const modelTreeImages = require('./../models/modelTreeImages')();
const fs = require('fs');
const multer = require("multer");


module.exports = app => {
    const controller = {};

    /**
     * Configuration for Multer
     * @type {DiskStorage}
     */
    const multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, app.get('images.uploadFolder'));
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
    const multerFilter = (req, file, cb) => {
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
    controller.uploadImage= multer({
        storage: multerStorage,
        fileFilter: multerFilter,
        limits: { fileSize: app.get('images.maxUploadFileSize') }
    });

    /**
     * Lists all trees
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {
            const result = await modelTreeImages.treesListAll();

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
     * Lists all images by tree id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listByTreeId = async (req, res) => {
        try {

            const treeId = req.params.treeId.trim();

            const result = await modelTreeImages.getTreeImageById(treeId);

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
            const ext = req.file.mimetype.split("/")[1];
            const dir = app.get('images.rootFolder') + req.params.treeId.trim();

            const newFilename = req.params.treeId.trim() + `-${Number(req.body.order)}.${ext}`;
            const newFilePath = app.get('images.rootFolder') + req.params.treeId.trim() + `/${newFilename}`

            const treeImageData = {
                id: crypto.randomUUID(),
                treeId: req.params.treeId.trim(),
                path: req.params.treeId.trim() + `/${newFilename}`,
                name: newFilename,
                description: req.body.description.trim(),
                size: req.file.size,
                position: Number(req.body.order),
                active: req.body.active.toLowerCase().trim() === 'true'? 1:0,
                dateCreated: new Date(),
                dateModified: new Date()
            }

            // console.log("treeId: " + req.params.treeId.trim());
            // // console.log("file: " + req.file);
            // console.log("file extension: " + ext);
            // console.log("filename: " + req.file.filename);
            // console.log("filepath: " + req.file.path);
            // console.log("size: " + req.file.size);
            // console.log("position: " + req.body.order);
            // console.log("description: " + req.body.description);
            // console.log("root: " + app.get('images.rootFolder'));
            // console.log("upload: " + app.get('images.uploadFolder'));
            // console.log("maxsize: " + app.get('images.maxUploadFileSize'));

            await modelTreeImages.createTreeImage(treeImageData);

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.rename(req.file.path, newFilePath, (err) => {
                if ( err ) console.log('ERROR: ' + err);
            });


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
    controller.deleteTreeImage = async (req, res) => {
        try {
            const imageId = req.params.imageId.trim();

            // get image details
            const image = await modelTreeImages.getTreeImageById(imageId)

            // TODO no image found

            const imageFile = app.get('images.rootFolder') + image[0].path;
            if (fs.existsSync(imageFile)){
                fs.unlinkSync(imageFile);
            }

            await modelTreeImages.deleteTreeImage(imageId)

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
