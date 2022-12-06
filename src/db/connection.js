import mysql from 'mysql';

const conn = mysql.createConnection({
  host: 'localhost',
  database: 'test3',
  user: 'root',
  password: '',
});

// conn.connect((err) => {
//   if (err) throw err;
//   conn.query('SELECT * FROM users', (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//   });
// });

export default conn;
