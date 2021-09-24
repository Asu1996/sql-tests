"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../queue/client'),
    readFromQueue = _require.readFromQueue;

router.get('/', function _callee(req, res) {
  var messageReceived;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(readFromQueue());

        case 3:
          messageReceived = _context.sent;
          res.send(messageReceived);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("Error in Read: ".concat(_context.t0));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;