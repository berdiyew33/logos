import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();

app.use(express.json());

const SECRET_KEY = 'mysecretkey';

app.post('/login', (req, res) => {
  const { username } = req.body;
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Hello, ${req.user.username}! This is a protected route.`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});