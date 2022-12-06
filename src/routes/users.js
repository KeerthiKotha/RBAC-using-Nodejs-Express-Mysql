import express from 'express';
import conn from '../db/connection';

const router = express.Router();

router.get('/users', (req, res) => {
  conn.connect((err) => {
    if (err) throw err;
    conn.query('SELECT * FROM users', (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });
});

// router.post('/usersregister', (req, res) => {
//   res.send('posted succesfully');
// });

export default router;
