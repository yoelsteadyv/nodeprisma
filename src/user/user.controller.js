// layer untuk handle request dan response
// biasanya juga handle validasi body
const express = require('express')
const prisma = require('../db')

const { getAllUsers, getUserById } = require('./user.service')

const router = express.Router()

// get user
router.get('/', async (req, res) => {
  const users = await getAllUsers()

  res.send(users);
});

// get user by id
router.get('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const user = await getUserById(userId)

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message)
  }

});

// create user
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.patch('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  const userId = req.params.id //string

  await prisma.user.delete({
    where: {
      id: parseInt(userId),
    }
  })
  res.status(202).send('user deleted')
})

module.exports = router