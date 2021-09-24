"use strict";

var _require = require('express'),
    request = _require.request;

var express = require('express'); // var ted = require('tedious');


var _require2 = require('tedious'),
    Connection = _require2.Connection,
    Request = _require2.Request;

var router = express.Router();
var config = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: '123Asu@pc'
    }
  },
  options: {
    database: 'Bikes',
    port: 1433,
    rowCollectionOnRequestCompletion: true
  }
};
var connection = new Connection(config);
router.get('/trans1', function (req, res) {
  connection.on('connect', function (err) {
    if (err) {
      console.log('connection err');
      throw err;
    }

    createTransaction();
  });
  connection.connect();
});

function createTransaction() {
  var sql = "INSERT INTO production.alphat1 VALUES (3, 'new trans1')";
  var request = new Request(sql, function (err, rowCount) {
    if (err) {
      console.log('Insert failed');
      throw err;
    }

    console.log('new Request cb'); // Call connection.beginTransaction() method in this 'new Request' call back function

    beginTransaction();
  });
  connection.execSql(request);
}

function beginTransaction() {
  connection.beginTransaction(function (err) {
    if (err) {
      // If error in begin transaction, roll back!
      rollbackTransaction(err);
    } else {
      console.log('beginTransaction() done'); // If no error, commit transaction!

      commitTransaction();
    }
  });
} // SQL: Commit Transaction (if no errors)
//--------------------------------------------------------------------------------


function commitTransaction() {
  connection.commitTransaction(function (err) {
    if (err) {
      console.log('commit transaction err: ', err);
    }

    console.log('commitTransaction() done!');
    console.log('DONE!');
    connection.close();
  });
} // SQL: Rolling Back Transaction - due to errors during transaction process.
//--------------------------------------------------------------------------------


function rollbackTransaction(err) {
  console.log('transaction err: ', err);
  connection.rollbackTransaction(function (err) {
    if (err) {
      console.log('transaction rollback error: ', err);
    }
  });
  connection.close();
}

module.exports = router;