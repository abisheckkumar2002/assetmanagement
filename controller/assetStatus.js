

const { Asset, AssetStatus,Employee } = require("../model/index.js");

exports.assetIssueIndex =async(req,res)=>{


  let condition = {
    include: [
      {
        model: Employee,
        attributes: ["EmpId","firstName"],
      },

      {
        model: Asset,
        attributes: ["name"],
      }
    ],
   
  };
  const data =await AssetStatus.findAll(condition)

 
console.log(data,"dddddddddddddddddddddddddddddddddd")


  return res.render("view/assetAssign/index.pug",{data});
}


exports.assetIssuePage =async(req,res)=>{

  
  let query 
  if(req.query.status){
   query =req.query.status
  }
  else{
    query="issued"
  }
  console.log("queryyyyyyy",query)

  const condition2 = {
    where: {
      status: query
    }
  };
  const data =await  Asset.findAll(condition2)


  return res.render("view/assetStatus/index.pug",{data});
}


exports.issueAssetPage= async(req,res)=>{

  const condition = { status: "Active" };
  const condition2 = {
    where: {
      status: "in-stock"
    }
  };
  const employee =await Employee.findAll(condition)
  const asset =await  Asset.findAll(condition2)

  return res.render("view/assetAssign/add.pug",{employee,asset});
}
exports.create = async (req, res) => {
  try {
    const userId = req.body.employeeId;
    const assetId = req.body.assetId;

    console.log(req.body, "Request Body");

    const assetExists = await Asset.findOne({
      where: { id: assetId },
    });

    const employeeExists = await Employee.findOne({
      where: { id: userId },
    });

    const assetAlreadyAssigned = await AssetStatus.findOne({
      where: { assetId: assetId },
    });

    console.log("assetExits", assetExists.dataValues.status);
    if (!assetExists) {
      return res.status(404).json({
        status: 404,
        message: "Asset ID not found",
      });
    }

    else{
      await Asset.update({ status: "issued" }, { where: { id: assetId } });
    }

    if (!employeeExists) {
      return res.status(404).json({
        status: 404,
        message: "Employee ID not found",
      });
    }

    if (assetAlreadyAssigned) {
      return res.status(400).json({
        status: 400,
        message: "Asset is already assigned to this employee",
      });
    }

    

    const result = await AssetStatus.create({
      employeeId: userId,
      assetId: assetId,
    });

    if (result) {
      res.redirect('/assetStatus');
    }
  } catch (err) {
    // Return a 500 error if something goes wrong
    res.status(500).json({
      error: "An error occurred while creating the asset status.",
      details: err.message,
    });
  }
};

exports.updateRepairStatus = async (req, res) => {
  try {
    const assetId = req.params.id;

    const assetExists = await Asset.findOne({
      where: { id: assetId, status: "issued" },
    });

    if (!assetExists) {
      return res.status(404).json({
        status: 404,
        message: "Asset id not found || Asset in not in the issued status",
      });
    } 
    else {
      const repairUpdateStatus = await AssetStatus.update(
        { status: "repair" },
        { where: { assetId: assetId } }
      );

      if (repairUpdateStatus) {
        return res.status(201).json({
          status: 200,
          message: "AssetStatus repair status updated",
        });
      }
       else {
        return res.status(500).json({
          status: 200,
          message: "error during the update the status repair",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while creating the update status.",
      details: err.message,
    });
  }
};
