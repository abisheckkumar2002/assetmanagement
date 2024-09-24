const { Asset, AssetStatus, Repair } = require("../model/index.js");

exports.index = async (req, res) => {

  let condition = {
    include: [
      {
        model: Asset,
        attributes: ["name"],
      },
    ]
  };
  const data = await Repair.findAll(condition)

  console.log(data,"ddddddddfdfdfeeeeeeeeeeeeeeeeeeeeeeeeeeee")

  
  res.render('view/repair/index.pug',{data})
};


exports.view = async(req,res)=>{

  let condition = {
    include: [
      {
        model: Asset,
        attributes: ["name"],
      },
    ]
  };
  const data = await Repair.findOne(condition)

  res.render('view/repair/view.pug',{data})
}

exports.updateRepairStatus = async (req, res) => {
  try {
    const assetId = req.params.id;

    // Check if the asset exists and is in the "issued" status
    const assetExists = await Asset.findOne({
      where: { id: assetId, status: "issued" },
    });

    const assetStatusExists = await AssetStatus.findOne({
      where: { assetId: assetId },
    });

    if (!assetExists) {
      return res.status(404).json({
        status: 404,
        message: "Asset id not found or Asset is not in the 'issued' status",
      });
    }

    if (!assetStatusExists) {
      return res.status(404).json({
        status: 404,
        message: "Asset id not found In the AssetStatus",
      });
    } 
    else
     {
      await Asset.update({ status: "repair" }, { where: { id: assetId } });


       await Repair.create({
        assetId: assetId,
        reason: req.body.reason,
      });

      return res.status(200).json({
        status: 200,
        message:
          "Successfully updated asset status to 'repair' and created repair record",
      });
    }

    
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "An error occurred while updating the asset status.",
      details: err.message,
    });
  }
};
