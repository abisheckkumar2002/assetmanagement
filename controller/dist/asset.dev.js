"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("../model/index.js"),
    Asset = _require.Asset,
    AssetCategory = _require.AssetCategory;

var _require2 = require("sequelize"),
    Op = _require2.Op;

exports.addAssetPage = function _callee(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(AssetCategory.findAll({
            status: "Active"
          }));

        case 2:
          data = _context.sent;
          console.log(data.length, "dvdvdvdvdvdv");
          res.render("view/asset/add.pug", {
            data: data
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.editUserPage = function _callee2(req, res) {
  var asset, categories;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Asset.findByPk(req.params.id, {
            where: {
              status: "Active"
            }
          }));

        case 3:
          asset = _context2.sent;

          if (asset) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            error: "Asset not found"
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(AssetCategory.findAll({
            where: {
              status: "Active"
            }
          }));

        case 8:
          categories = _context2.sent;
          console.log(asset.dataValues, "datavalues");
          res.render("view/asset/edit.pug", {
            dataValues: asset.dataValues,
            // Pass asset details
            categories: categories // Pass categories data

          });
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            error: "An error occurred while loading the edit page.",
            details: _context2.t0.message
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.create = function _callee3(req, res) {
  var categoryId, categortyExists, newData;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          categoryId = req.body.categoryId;
          console.log(categoryId, "categoryIdcategoryIdcategoryIdcategoryIdcategoryId");
          _context3.next = 5;
          return regeneratorRuntime.awrap(AssetCategory.findOne({
            where: {
              id: categoryId
            }
          }));

        case 5:
          categortyExists = _context3.sent;

          if (categortyExists.dataValues) {
            _context3.next = 10;
            break;
          }

          res.status(404).json({
            status: 404,
            message: "AssetCategory Id is not found"
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(Asset.create({
            assetId: req.body.assetId,
            name: req.body.name,
            model: req.body.model,
            categoryId: req.body.categoryId,
            branch: req.body.branch
          }));

        case 12:
          newData = _context3.sent;

          if (!newData) {
            res.status(500).json({
              status: 500,
              message: "An error occurred while creating the Asset."
            });
          } else {
            res.redirect("/asset");
          }

        case 14:
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: "An error occurred while creating the Asset.",
            details: _context3.t0.message
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.index = function _callee4(req, res) {
  var condition, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          condition = {
            include: [{
              model: AssetCategory,
              attributes: ["categoryName"]
            }],
            where: {} //dot

          };

          if (req.query.branch) {
            condition.where.branch = _defineProperty({}, Op.like, "%".concat(req.query.branch, "%"));
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(Asset.findAll(condition));

        case 4:
          data = _context4.sent;
          console.log("dddddd", data);
          console.log(data);

          try {
            if (data.length > 0) {
              res.render("view/asset/index.pug", {
                data: data
              });
            } else {
              res.status(404).json({
                status: 404,
                error: "No Asset Record Found"
              });
            }
          } catch (err) {
            console.error(err);
            res.status(500).json({
              error: "An error occurred while creating the Asset.",
              details: err.message
            });
          }

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.findOne = function _callee5(req, res) {
  var assetId, data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          assetId = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Asset.findByPk(assetId, {
            include: [{
              model: AssetCategory,
              attributes: ["categoryName"]
            }]
          }));

        case 4:
          data = _context5.sent;

          if (!data.dataValues) {
            res.status(404).json({
              error: "Asset not found",
              // Updated error message
              status: 404
            });
          } else {
            res.render("view/asset/view.pug", {
              data: data
            });
          }

          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json({
            error: "An error occurred while retrieving the Asset.",
            // Updated error message
            details: _context5.t0.message
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.deleteOne = function _callee6(req, res) {
  var condition, data, DeletedData;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          condition = {
            id: req.params.id
          };
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Asset.findOne({
            where: condition
          }));

        case 4:
          data = _context6.sent;

          if (data) {
            _context6.next = 9;
            break;
          }

          res.status(404).json({
            error: "No Asset Record Found"
          });
          _context6.next = 13;
          break;

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(Asset.destroy({
            where: condition
          }));

        case 11:
          DeletedData = _context6.sent;

          if (DeletedData) {
            res.status(201).json({
              status: 200,
              message: "Asset Deleted Sucessfully "
            });
          }

        case 13:
          _context6.next = 19;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](1);
          console.error(_context6.t0);
          res.status(500).json({
            error: "An error occurred while creating the Asset.",
            details: _context6.t0.message
          });

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

exports.updateOne = function _callee7(req, res) {
  var idCondtion, data, updatedData;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          idCondtion = {
            id: req.params.id,
            status: "in-stock"
          };
          _context7.next = 4;
          return regeneratorRuntime.awrap(AssetCategory.findByPk(req.body.categoryId));

        case 4:
          data = _context7.sent;

          if (data) {
            _context7.next = 9;
            break;
          }

          res.status(404).json({
            error: "No AssetCategory Record Found"
          });
          _context7.next = 13;
          break;

        case 9:
          _context7.next = 11;
          return regeneratorRuntime.awrap(Asset.update(req.body, {
            where: idCondtion
          }));

        case 11:
          updatedData = _context7.sent;

          if (updatedData) {
            res.redirect('/asset');
          }

        case 13:
          _context7.next = 18;
          break;

        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            error: "An error occurred while creating the Asset.",
            details: _context7.t0.message
          });

        case 18:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 15]]);
};