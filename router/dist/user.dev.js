"use strict";

var router = require("express").Router();

var userController = require('../controller/UserController.js'); //pages


router.get('/', userController.index);
router.get('/add', userController.addUserPage);
router.get("/edit/:id", userController.editUserPage);
router.get('/view/:id', userController.findOne); //logic

router.post('/', userController.create);
router.put('/:id', userController.updateOne);
router["delete"]('/:id', userController.deleteOne);
module.exports = router;