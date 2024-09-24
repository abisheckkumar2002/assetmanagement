const router =require('express').Router();
const controller =require("../controller/asset.js");


//pages

router.get('/',controller.index)
router.get('/add',controller.addAssetPage)
router.get('/view/:id',controller.findOne)
router.get("/edit/:id",controller.editUserPage)

//logic
router.post('/',controller.create)


router.put('/:id',controller.updateOne)
router.delete('/:id',controller.deleteOne)

module.exports =router

// //pages
// router.get('/',userController.index)
// router.get('/add',userController.addUserPage)
// router.get("/edit/:id",userController.editUserPage)
// router.get('/view/:id',userController.findOne)

// //logic
// router.post('/',userController.create)
// router.put('/:id',userController.updateOne)
// router.delete('/delete/:id',userController.deleteOne)