// layer untuk handle request dan response
// biasanya juga handle validasi body
const express = require('express')
const prisma = require('../db')

const { getAllUsers, getUserById, createUser, deleteUserById, editUserById } = require('./user.service')

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
    const user = await getUserById(parseInt(userId))

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message)
  }

});

// create user
router.post('/', async (req, res) => {
  try {
    const newUser = req.body
    const user = await createUser(newUser)

    res.status(201).send({
      data: user,
      message: 'create user succes'
    });
  } catch (error) {
    res.status(400).send(error.message)
  }

});

// put user
router.put('/:id', async (req, res) => {
  const userId = req.params.id //string
  const userData = req.body;

  if (!(userData.nama && userData.email && userData.password)) {
    return res.status(400).send('some fields are missing')
  }

  const user = await editUserById(parseInt(userId), userData)

  res.status(200).send({
    data: user,
    message: 'edit user success'
  })
})

// Patch user
router.patch('/:id', async (req, res) => {
  try {
    const userId = req.params.id //string
    const userData = req.body;

    const user = await editUserById(parseInt(userId), userData)

    res.status(200).send({
      data: user,
      message: 'edit user success'
    })

  } catch (error) {
    res.status(400).send(error.message)
  }
})

// delete user
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id //string

    await deleteUserById(parseInt(userId))

    res.send('user deleted')
  } catch (error) {
    res.status(400).send(error.message)
  }

})

module.exports = router