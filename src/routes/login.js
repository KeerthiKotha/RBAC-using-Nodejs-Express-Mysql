import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import conn from '../db/connection';
import { createTokens } from '../jwt';

const router = express.Router();
const saltRounds = 10;

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  conn.query(
    'select * from users where username=?',
    username,
    (err, result) => {
      if (err) console.log(err);
      if (result.length === 0) {
        res.send('Incorrect username');
      } else {
        console.log(result[0]);
        const userpassword = result[0].password;
        bcrypt.compare(password, userpassword).then((match) => {
          if (match) {
            const accessToken = createTokens(result[0]);
            res.cookie('access-token', accessToken, {
              maxAge: 60 * 60 * 24 * 30 * 1000,
              httpOnly: true,
            });
            res.status(200).send(`${username} is logged in`);
          } else {
            res.status(400).send('password incorrect');
          }
        });
      }
    }
  );
});

router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    conn.query(
      "INSERT INTO users VALUES(69 , 'test', 'data', '1234567890', 'test96data@gmail.com', ? , ? , 'admin', 'admin', 1, 0, NULL, 'admin', 'admin', 1, NULL, NULL)",
      [username, hash],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ message: 'succesfully inserted' });
        }
      }
    );
  });
});

router.post('/login2', (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    message: 'login successfull',
  });
});

export default router;
