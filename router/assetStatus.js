const router =require('express').Router();

const controller =require("../controller/assetStatus.js")


//pages
router.get('/',controller.assetIssueIndex)
router.get('/add',controller.issueAssetPage)
router.get('/assetissue',controller.assetIssuePage)

router.post('/',controller.create)



module.exports =router