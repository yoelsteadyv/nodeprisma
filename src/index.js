const express = require('express');
const dotenv = require('dotenv');



const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('hello world!')
});

const userController = require('./user/user.controller')

app.use('/users', userController)

app.listen(PORT, () => {
  console.log('api running in port: ' + PORT)
});