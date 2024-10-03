// service layer bertujuan untuk handle business logic
// kenapa dipisah ? supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

const prisma = require('../db')


// get all user
const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    throw new Error('fail to got datas: ' + error.message)
  }
}

// get user by id
const getUserById = async (id) => {
  if (typeof id !== 'number') {
    throw new Error('ID is not a number')
  }


  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  })
  if (!user) {
    return { message: 'user not found' };
  }

  return user
}

// create user
const createUser = async (newUser) => {


  const user = await prisma.user.create({
    data: {
      nama: newUser.nama,
      email: newUser.email,
      password: newUser.password
    },

  });
  return user
}

const deleteUserById = async (id) => {

  // logic sebelum delete nyari user dulu
  await getUserById(id)

  await prisma.user.delete({
    where: {
      id,
    }
  })
  return
}

const editUserById = async (id, userData) => {
  await getUserById(id)

  const user = await prisma.user.update({
    where: {
      id: parseInt(id)
    },
    data: {
      nama: userData.nama,
      email: userData.email,
      password: userData.password
    }
  })

  return user
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  editUserById
}