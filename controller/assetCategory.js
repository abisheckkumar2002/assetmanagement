const AssetCategory = require("../model/assetCategory.js");





exports.addAssetCategoryPage= async(req,res)=>{


  res.render('view/assetCategory/add.pug');
}

exports.editAssetCategory = async(req,res)=>{

  const condition = {
    id: req.params.id,
    status: "Active",
  };
  const {dataValues}= await AssetCategory.findOne({ where: condition });
  

  res.render('view/assetCategory/edit.pug',{dataValues})
}


exports.create = async (req, res) => {
  try {
    const result = await AssetCategory.create({
      categoryName: req.body.categoryName,
    });
    if (result) {
      res.redirect('/assetcategory');
    }
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while creating the employee.",
      details: err.message,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const data = await AssetCategory.findByPk(req.params.id);

    if (!data) {
      res.status(404).json({
        error: "AssetCategory is not found",
        status: 404,
      });
    }
    res.status(201).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the AssetCategory.",
      details: err.message,
    });
  }
};

exports.index = async (req, res) => {

  const condition = { status: "Active" };
  const data = await AssetCategory.findAll(condition);

  try {
    if (data.length > 0) {
      res.render('view/assetCategory/index.pug',{data});
    } else {
      res.status(404).json({
        status: 404,
        error: "No AssetCategory Record Found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the AssetCategory.",
      details: err.message,
    });
  }
};

exports.updateOne = async (req, res) => {
  const condition = {
    id: req.params.id,
  };

  try {
    const data = await AssetCategory.findOne( condition );

    if (!data) {
      res.status(404).json({
        error: "No AssetCategory Record Found",
      });
    } else {
      const updatedData = await AssetCategory.update(req.body, {
        where: condition,
      });

      if (updatedData) {
        res.redirect('/assetcategory/')
      }
    }
  } 
  catch (err) {
 
    res.status(500).json({
      error: "An error occurred while creating the AssetCategory.",
      details: err.message,
    });
  }
};


exports.deleteOne = async (req, res) => {
    const condition = {
      id: req.params.id,
      
    };
  
    try {
      const data = await AssetCategory.findOne(condition );
  
      if (!data) {
        res.status(404).json({
          error: "No AssetCategory Record Found",
        });
      } else {
        const DeletedData = await AssetCategory.destroy({where:condition } );
  
        if (DeletedData) {
          res.status(201).json({
            status: 200,
            message: "AssetCategory Deleted Sucessfully ",
          });
        }
      }
    } 
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: "An error occurred while deleting the AssetCategory.",
        details: err.message,
      });
    }
  };