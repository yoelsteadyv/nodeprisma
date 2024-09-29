const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('hello world!')
});

// get user
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();

  res.send(users);
});

// get user by id
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId)
    }
  })
  if (!user) {
    return res.status(400).send('user not found')
  }

  res.status(201).send(user);
});

// create user
app.post('/users', async (req, res) => {
  const newUser = req.body;

  const user = await prisma.user.create({
    data: {
      nama: newUser.nama,
      email: newUser.email,
      password: newUser.password
    },

  });
  res.status(201).send({
    data: user,
    message: 'create user succes'
  });

});

// put user
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id //string
  const userData = req.body;

  if (!(userData.nama && userData.email && userData.password)) {
    return res.status(400).send('some fields are missing')
  }

  const user = await prisma.user.update({
    where: {
      id: parseInt(userId)
    },
    data: {
      nama: userData.nama,
      email: userData.email,
      password: userData.password
    }
  })

  res.status(200).send({
    data: user,
    message: 'edit user success'
  })
})

// Patch user
app.patch('/users/:id', async (req, res) => {
  const userId = req.params.id //string
  const userData = req.body;

  const user = await prisma.user.update({
    where: {
      id: parseInt(userId)
    },
    data: {
      nama: userData.nama,
      email: userData.email,
      password: userData.password
    }
  })

  res.status(200).send({
    data: user,
    message: 'edit user success'
  })
})

// delete user
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id //string

  await prisma.user.delete({
    where: {
      id: parseInt(userId),
    }
  })
  res.status(202).send('user deleted')
})

app.listen(PORT, () => {
  console.log('api running in port: ' + PORT)
});