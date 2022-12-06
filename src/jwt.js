import { sign, verify } from 'jsonwebtoken';

export const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    'jwtsecretplschange' // secret
  );

  return accessToken;
};

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken)
    return res.status(400).json({ error: 'User not Authenticated!' });

  verify(accessToken, 'jwtsecretplschange', (err, encoded) => {
    if (err) {
      res.status(400).json({ message: 'Token invalid' });
    } else {
      req.authenticated = true;
      req.user = encoded;
      return next();
    }
  });
};
