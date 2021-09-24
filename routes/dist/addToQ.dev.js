"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../queue/client'),
    addToQueue = _require.addToQueue;

router.post('/', function _callee(req, res) {
  var message;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          message = req.body.message;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(addToQueue(message));

        case 4:
          res.send({
            message: 'Done!'
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.log("Error in Add: ".concat(_context.t0));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
module.exports = router;