const { Asset, AssetCategory } = require("../model/index.js");
const { Op } = require("sequelize");

exports.addAssetPage = async (req, res) => {
  const data = await AssetCategory.findAll({ status: "Active" });

  console.log(data.length, "dvdvdvdvdvdv");
  res.render("view/asset/add.pug", { data });
};

exports.editUserPage = async (req, res) => {
  try {
    // Fetch asset by ID
    const asset = await Asset.findByPk(req.params.id, {
      where: { status: "Active" },
    });

    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    
    const categories = await AssetCategory.findAll({
      where: { status: "Active" },
    });

    console.log(asset.dataValues, "datavalues");

    
    res.render("view/asset/edit.pug", {
      dataValues: asset.dataValues, // Pass asset details
      categories: categories, // Pass categories data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while loading the edit page.",
      details: err.message,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;

    console.log(
      categoryId,
      "categoryIdcategoryIdcategoryIdcategoryIdcategoryId"
    );

    const categortyExists = await AssetCategory.findOne({
      where: { id: categoryId },
    });

    if (!categortyExists.dataValues) {
      res.status(404).json({
        status: 404,
        message: "AssetCategory Id is not found",
      });
    } else {
      const newData = await Asset.create({
        assetId: req.body.assetId,
        name: req.body.name,
        model: req.body.model,
        categoryId: req.body.categoryId,
        branch: req.body.branch,
      });

      if (!newData) {
        res.status(500).json({
          status: 500,
          message: "An error occurred while creating the Asset.",
        });
      } else {
        res.redirect("/asset");
      }
    }
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while creating the Asset.",
      details: err.message,
    });
  }
};

exports.index = async (req, res) => {
  let condition = {
    include: [
      {
        model: AssetCategory,
        attributes: ["categoryName"],
      },
    ],
    where: {}, //dot
  };

  if (req.query.branch) {
    condition.where.branch = {
      [Op.like]: `%${req.query.branch}%`,
    };
  }

  const data = await Asset.findAll(condition);

  console.log("dddddd", data);

  console.log(data);
  try {
    if (data.length > 0) {
      res.render("view/asset/index.pug", { data });
    } else {
      res.status(404).json({
        status: 404,
        error: "No Asset Record Found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the Asset.",
      details: err.message,
    });
  }
};

exports.findOne = async (req, res) => {
  const assetId = req.params.id;

  try {
    const data = await Asset.findByPk(assetId, {
      include: [
        {
          model: AssetCategory, 
          attributes: ["categoryName"],
        },
      ],
    });

   
    if (!data.dataValues) {
      res.status(404).json({
        error: "Asset not found", // Updated error message
        status: 404,
      });
    } else {
      res.render("view/asset/view.pug", { data });
    }
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while retrieving the Asset.", // Updated error message
      details: err.message,
    });
  }
};

exports.deleteOne = async (req, res) => {
  const condition = {
    id: req.params.id,
  };

  try {
    const data = await Asset.findOne({ where: condition });

    if (!data) {
      res.status(404).json({
        error: "No Asset Record Found",
      });
    } else {
      const DeletedData = await Asset.destroy({ where: condition });

      if (DeletedData) {
        res.status(201).json({
          status: 200,
          message: "Asset Deleted Sucessfully ",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the Asset.",
      details: err.message,
    });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const idCondtion = {
      id: req.params.id,
      status: "in-stock",
    };

    const data = await AssetCategory.findByPk(req.body.categoryId);

    if (!data) {
      res.status(404).json({
        error: "No AssetCategory Record Found",
      });
    } else {
      const updatedData = await Asset.update(req.body, {
        where: idCondtion,
      });

      if (updatedData) {
       res.redirect('/asset')
      }
    }
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while creating the Asset.",
      details: err.message,
    });
  }
};
