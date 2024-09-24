"use strict";

var _require = require("../model/index.js"),
    Asset = _require.Asset,
    AssetStatus = _require.AssetStatus,
    Employee = _require.Employee;

exports.assetIssueIndex = function _callee(req, res) {
  var condition, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          condition = {
            include: [{
              model: Employee,
              attributes: ["EmpId", "firstName"]
            }, {
              model: Asset,
              attributes: ["name"]
            }]
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(AssetStatus.findAll(condition));

        case 3:
          data = _context.sent;
          console.log(data, "dddddddddddddddddddddddddddddddddd");
          return _context.abrupt("return", res.render("view/assetAssign/index.pug", {
            data: data
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.assetIssuePage = function _callee2(req, res) {
  var query, condition2, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (req.query.status) {
            query = req.query.status;
          } else {
            query = "issued";
          }

          console.log("queryyyyyyy", query);
          condition2 = {
            where: {
              status: query
            }
          };
          _context2.next = 5;
          return regeneratorRuntime.awrap(Asset.findAll(condition2));

        case 5:
          data = _context2.sent;
          return _context2.abrupt("return", res.render("view/assetStatus/index.pug", {
            data: data
          }));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.issueAssetPage = function _callee3(req, res) {
  var condition, condition2, employee, asset;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          condition = {
            status: "Active"
          };
          condition2 = {
            where: {
              status: "in-stock"
            }
          };
          _context3.next = 4;
          return regeneratorRuntime.awrap(Employee.findAll(condition));

        case 4:
          employee = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Asset.findAll(condition2));

        case 7:
          asset = _context3.sent;
          return _context3.abrupt("return", res.render("view/assetAssign/add.pug", {
            employee: employee,
            asset: asset
          }));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.create = function _callee4(req, res) {
  var userId, assetId, assetExists, employeeExists, assetAlreadyAssigned, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.body.employeeId;
          assetId = req.body.assetId;
          console.log(req.body, "Request Body");
          _context4.next = 6;
          return regeneratorRuntime.awrap(Asset.findOne({
            where: {
              id: assetId
            }
          }));

        case 6:
          assetExists = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              id: userId
            }
          }));

        case 9:
          employeeExists = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(AssetStatus.findOne({
            where: {
              assetId: assetId
            }
          }));

        case 12:
          assetAlreadyAssigned = _context4.sent;
          console.log("assetExits", assetExists.dataValues.status);

          if (assetExists) {
            _context4.next = 18;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            status: 404,
            message: "Asset ID not found"
          }));

        case 18:
          _context4.next = 20;
          return regeneratorRuntime.awrap(Asset.update({
            status: "issued"
          }, {
            where: {
              id: assetId
            }
          }));

        case 20:
          if (employeeExists) {
            _context4.next = 22;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            status: 404,
            message: "Employee ID not found"
          }));

        case 22:
          if (!assetAlreadyAssigned) {
            _context4.next = 24;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            status: 400,
            message: "Asset is already assigned to this employee"
          }));

        case 24:
          _context4.next = 26;
          return regeneratorRuntime.awrap(AssetStatus.create({
            employeeId: userId,
            assetId: assetId
          }));

        case 26:
          result = _context4.sent;

          if (result) {
            res.redirect('/assetStatus');
          }

          _context4.next = 33;
          break;

        case 30:
          _context4.prev = 30;
          _context4.t0 = _context4["catch"](0);
          // Return a 500 error if something goes wrong
          res.status(500).json({
            error: "An error occurred while creating the asset status.",
            details: _context4.t0.message
          });

        case 33:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 30]]);
};

exports.updateRepairStatus = function _callee5(req, res) {
  var assetId, assetExists, repairUpdateStatus;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          assetId = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Asset.findOne({
            where: {
              id: assetId,
              status: "issued"
            }
          }));

        case 4:
          assetExists = _context5.sent;

          if (assetExists) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            status: 404,
            message: "Asset id not found || Asset in not in the issued status"
          }));

        case 9:
          _context5.next = 11;
          return regeneratorRuntime.awrap(AssetStatus.update({
            status: "repair"
          }, {
            where: {
              assetId: assetId
            }
          }));

        case 11:
          repairUpdateStatus = _context5.sent;

          if (!repairUpdateStatus) {
            _context5.next = 16;
            break;
          }

          return _context5.abrupt("return", res.status(201).json({
            status: 200,
            message: "AssetStatus repair status updated"
          }));

        case 16:
          return _context5.abrupt("return", res.status(500).json({
            status: 200,
            message: "error during the update the status repair"
          }));

        case 17:
          _context5.next = 22;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: "An error occurred while creating the update status.",
            details: _context5.t0.message
          });

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 19]]);
};