"use strict";

var router = require('express').Router();

var controller = require("../controller/repair.js"); //pages


router.get('/', controller.index);
router.get('/view/:id', controller.view);
router.put('/updateRepair/:id', controller.updateRepairStatus);
module.exports = router;