"use strict";

var Employee = require("../model/user.js");

exports.create = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body, "reqbody");
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            EmpId: req.body.EmpId,
            email: req.body.email,
            address: req.body.address,
            status: "Active"
          }));

        case 4:
          res.redirect('/users');
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).json({
            error: "An error occurred while creating the employee.",
            details: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

exports.findOne = function _callee2(req, res) {
  var condition, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          condition = {
            id: req.params.id,
            status: "Active"
          };
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: condition
          }));

        case 4:
          data = _context2.sent;

          if (!data) {
            res.status(404).json({
              error: "Employee is not found",
              status: 404
            });
          }

          res.render('view/user/view.pug', {
            data: data
          });
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.status(500).json({
            error: "An error occurred while creating the employee.",
            details: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.addUserPage = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render('view/user/add.pug');

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.editUserPage = function _callee4(req, res) {
  var condition, _ref, dataValues;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          condition = {
            id: req.params.id,
            status: "Active"
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: condition
          }));

        case 3:
          _ref = _context4.sent;
          dataValues = _ref.dataValues;
          res.render('view/user/edit.pug', {
            dataValues: dataValues
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.index = function _callee5(req, res) {
  var condition, data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          condition = {
            status: "Active"
          };
          _context5.next = 3;
          return regeneratorRuntime.awrap(Employee.findAll(condition));

        case 3:
          data = _context5.sent;

          try {
            if (data.length > 0) {
              res.render('view/user/index.pug', {
                data: data
              });
            } else {
              res.status(404).json({
                status: 404,
                error: "No Employee Record Found"
              });
            }
          } catch (err) {
            console.error(err);
            res.status(500).json({
              error: "An error occurred while creating the employee.",
              details: err.message
            });
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.updateOne = function _callee6(req, res) {
  var condition, data, updatedData;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          condition = {
            id: req.params.id,
            status: "Active"
          };
          _context6.prev = 1;
          console.log("ddddddddddddddddddddddddddddddddddd");
          _context6.next = 5;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: condition
          }));

        case 5:
          data = _context6.sent;

          if (data) {
            _context6.next = 10;
            break;
          }

          res.status(404).json({
            error: "No Employee Record Found"
          });
          _context6.next = 14;
          break;

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(Employee.update(req.body, {
            where: condition
          }));

        case 12:
          updatedData = _context6.sent;

          if (updatedData) {
            res.redirect('/users/');
          }

        case 14:
          _context6.next = 20;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](1);
          console.error(_context6.t0);
          res.status(500).json({
            error: "An error occurred while creating the employee.",
            details: _context6.t0.message
          });

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

exports.deleteOne = function _callee7(req, res) {
  var condition, employee, updatedData;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log("hiiiiiiiiiiii");
          condition = {
            id: req.params.id,
            status: "Active"
          };
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: condition
          }));

        case 5:
          employee = _context7.sent;

          if (employee) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            error: "No Employee Record Found"
          }));

        case 8:
          _context7.next = 10;
          return regeneratorRuntime.awrap(Employee.update({
            status: "InActive"
          }, {
            where: condition
          }));

        case 10:
          updatedData = _context7.sent;

          if (!(updatedData[0] === 1)) {
            _context7.next = 15;
            break;
          }

          return _context7.abrupt("return", res.redirect('/users'));

        case 15:
          return _context7.abrupt("return", res.status(400).json({
            error: "Failed to update the employee status."
          }));

        case 16:
          _context7.next = 22;
          break;

        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](2);
          console.error(_context7.t0);
          res.status(500).json({
            error: "An error occurred while updating the employee status.",
            details: _context7.t0.message
          });

        case 22:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 18]]);
};