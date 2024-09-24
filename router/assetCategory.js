const router =require('express').Router();

const controller =require("../controller/assetCategory.js")

//pages
router.get('/',controller.index);
router.get('/add',controller.addAssetCategoryPage)
router.get('/edit/:id',controller.editAssetCategory)


//logic

router.post('/',controller.create)
router.get('/:id',controller.findOne)
// router.get('/',controller.findAll)

router.put('/:id',controller.updateOne)
router.delete('/:id',controller.deleteOne)
module.exports =router





