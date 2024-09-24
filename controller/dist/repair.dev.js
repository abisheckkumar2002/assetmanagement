"use strict";

var _require = require("../model/index.js"),
    Asset = _require.Asset,
    AssetStatus = _require.AssetStatus,
    Repair = _require.Repair;

exports.index = function _callee(req, res) {
  var condition, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          condition = {
            include: [{
              model: Asset,
              attributes: ["name"]
            }]
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(Repair.findAll(condition));

        case 3:
          data = _context.sent;
          console.log(data, "ddddddddfdfdfeeeeeeeeeeeeeeeeeeeeeeeeeeee");
          res.render('view/repair/index.pug', {
            data: data
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.view = function _callee2(req, res) {
  var condition, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          condition = {
            include: [{
              model: Asset,
              attributes: ["name"]
            }]
          };
          _context2.next = 3;
          return regeneratorRuntime.awrap(Repair.findOne(condition));

        case 3:
          data = _context2.sent;
          res.render('view/repair/view.pug', {
            data: data
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.updateRepairStatus = function _callee3(req, res) {
  var assetId, assetExists, assetStatusExists;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          assetId = req.params.id; // Check if the asset exists and is in the "issued" status

          _context3.next = 4;
          return regeneratorRuntime.awrap(Asset.findOne({
            where: {
              id: assetId,
              status: "issued"
            }
          }));

        case 4:
          assetExists = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(AssetStatus.findOne({
            where: {
              assetId: assetId
            }
          }));

        case 7:
          assetStatusExists = _context3.sent;

          if (assetExists) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            status: 404,
            message: "Asset id not found or Asset is not in the 'issued' status"
          }));

        case 10:
          if (assetStatusExists) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            status: 404,
            message: "Asset id not found In the AssetStatus"
          }));

        case 14:
          _context3.next = 16;
          return regeneratorRuntime.awrap(Asset.update({
            status: "repair"
          }, {
            where: {
              id: assetId
            }
          }));

        case 16:
          _context3.next = 18;
          return regeneratorRuntime.awrap(Repair.create({
            assetId: assetId,
            reason: req.body.reason
          }));

        case 18:
          return _context3.abrupt("return", res.status(200).json({
            status: 200,
            message: "Successfully updated asset status to 'repair' and created repair record"
          }));

        case 19:
          _context3.next = 24;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            status: 500,
            error: "An error occurred while updating the asset status.",
            details: _context3.t0.message
          });

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 21]]);
};