const { request } = require('express');
var express = require('express');
var ted = require('tedious');
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
var connection = new ted.Connection(config);

router.get('/tvp3', (req, res) => {
  connection.on('connect', function(err) {
      if(err) {
        console.log('Error: ', err)
      }
      console.log('hua?')
      var table = {
          columns: [
            {name: 'a', type: ted.TYPES.Int},
            {name: 'b', type: ted.TYPES.VarChar, length: 10},
          //   {name: 'user_enabled', type: TYPES.Bit}
          ],
          rows: [
            [15, 'Eric'],
            [16, 'John']
          ]
      };
      var request = new ted.Request("production.inserttvp1", function(err, rowCount, rows) {
          if(err) {
              console.log('Error: ', err)
            }
          console.log('tvp row count res: ', rowCount);
          console.log('tvp dataa: ', rows);
        });
        request.addParameter('tvp', ted.TYPES.TVP, table);
        
        connection.callProcedure(request);
        console.log('end')
  });
  connection.connect();
})

router.get('/', (req, res) => {
  connection.on('connect', function(err) {
      if(err) {
        console.log('Error: ', err)
      }

      var request = new ted.Request("SELECT * from production.brands", function(err, rowCount, rows) {
          if(err) {
              console.log('Error: ', err)
            }
          console.log('row count res: ', rowCount);
          console.log('dataa: ', rows);
        });
        
        connection.execSql(request);
    });
    connection.connect();
})

// router.get('/', (req, res) => {
//     try {
//         var connection = new ted.Connection(config);
//         connection.connect();
//         connection.connect( 
//             function(err) {
//             if (err) {
//                 console.log(err);
//             }
//             // callTVP();
//             var table = {
//                 columns: [
//                   {name: 'a', type: TYPES.Int},
//                   {name: 'b', type: TYPES.VarChar, length: 10},
//                 //   {name: 'user_enabled', type: TYPES.Bit}
//                 ],
//                 rows: [
//                   [15, 'Eric'],
//                   [16, 'John']
//                 ]
//               };
//             var request = new Request("production.tvp1", function(err) {
//             console.log(err);
//             });
//             request.addParameter('tvp', ted.TYPES.TVP, table);
        
//             connection.callProcedure(request);
            
//         )
        
//     } catch (e) {
//         console.log(e);
//     }
// })

// router.get('/tvp2', (req, res) => {
//     connection.on('connect', function(err) {
//         if(err) {
//           console.log('Error: ', err)
//         }
//         console.log('hua?')
//         var table = {
//             columns: [
//               {name: 'a', type: ted.TYPES.Int},
//               {name: 'b', type: ted.TYPES.VarChar, length: 10},
//             //   {name: 'user_enabled', type: TYPES.Bit}
//             ],
//             rows: [
//               [15, 'Eric'],
//               [16, 'John']
//             ]
//         };
//         var request = new ted.Request("production.tvp1", function(err, rowCount, rows) {
//             if(err) {
//                 console.log('Error: ', err)
//               }
//             console.log('tvp row count res: ', rowCount);
//             console.log('tvp dataa: ', rows);
//           });
//           request.addParameter('tvp', ted.TYPES.TVP, table);
          
//           connection.callProcedure(request);
//     });
//     connection.connect();
// })

module.exports = router;