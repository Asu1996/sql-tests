"use strict";

var _require = require("@azure/storage-queue"),
    QueueClient = _require.QueueClient,
    QueueServiceClient = _require.QueueServiceClient;

var connectionString = "UseDevelopmentStorage=true";
var queueName = "myqueue-project-kay";
var queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
var queueClient = queueServiceClient.getQueueClient(queueName);

var addToQueue = function addToQueue(message) {
  return regeneratorRuntime.async(function addToQueue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(queueClient.sendMessage(message));

        case 2:
          console.log("".concat(message, " added to queue ").concat(queueName));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var readFromQueue = function readFromQueue() {
  var receivedMessages, message;
  return regeneratorRuntime.async(function readFromQueue$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(queueClient.receiveMessages({
            numberOfMessages: 1
          }));

        case 2:
          receivedMessages = _context2.sent;
          message = receivedMessages.receivedMessageItems[0];

          if (!(message === undefined)) {
            _context2.next = 8;
            break;
          }

          message = '';
          _context2.next = 10;
          break;

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(queueClient.deleteMessage(message.messageId, message.popReceipt));

        case 10:
          console.log("message dequeued: ".concat(message));
          return _context2.abrupt("return", message.messageText);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  addToQueue: addToQueue,
  readFromQueue: readFromQueue
};