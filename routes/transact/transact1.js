const { request } = require('express');
var express = require('express');
// var ted = require('tedious');
const { Connection, Request } = require('tedious');
var router = express.Router();

const config = {
    server:'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: '123Asu@pc'
        }
    },
    options: {
        database:'Bikes',
        port : 1433,
        rowCollectionOnRequestCompletion: true
    }
}

const connection = new Connection(config);

router.get('/trans1', (req, res) => {
    connection.on('connect', (err) => {
        if (err) {
          console.log('connection err');
          throw err;
        }
      
        createTransaction();
      });
      connection.connect();
})

function createTransaction() {
    const sql = `INSERT INTO production.alphat1 VALUES (3, 'new trans1')`;
  
    const request = new Request(sql, (err, rowCount) => {
      if (err) {
        console.log('Insert failed');
        throw err;
      }
  
      console.log('new Request cb');
  
      // Call connection.beginTransaction() method in this 'new Request' call back function
      beginTransaction();
    });
  
    connection.execSql(request);
}

function beginTransaction() {
    connection.beginTransaction((err) => {
        if (err) {
        // If error in begin transaction, roll back!
        rollbackTransaction(err);
        } else {
        console.log('beginTransaction() done');
        // If no error, commit transaction!
        commitTransaction();
        }
    });
}

// SQL: Commit Transaction (if no errors)
//--------------------------------------------------------------------------------
function commitTransaction() {
    connection.commitTransaction((err) => {
      if (err) {
        console.log('commit transaction err: ', err);
      }
      console.log('commitTransaction() done!');
      console.log('DONE!');
      connection.close();
    });
  }
  
  // SQL: Rolling Back Transaction - due to errors during transaction process.
  //--------------------------------------------------------------------------------
  function rollbackTransaction(err) {
    console.log('transaction err: ', err);
    connection.rollbackTransaction((err) => {
      if (err) {
        console.log('transaction rollback error: ', err);
      }
    });
    connection.close();
  }

module.exports = router;
