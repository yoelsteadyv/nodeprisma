// service layer bertujuan untuk handle business logic
// kenapa dipisah ? supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

const prisma = require('../db')
const { findUserById, insertUser, findUserByName, deleteUser, editUser } = require('./user.repository')


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

  const user = await findUserById(id)
  if (!user) {
    return { message: 'user not found' };
  }

  return user
}

// create user
const createUser = async (newUser) => {
  const findUser = await findUserByName(newUser.nama)

  // Periksa apakah nama sudah ada
  if (findUser) {
    throw new Error('Nama harus unik')
  }

  // Validasi data pengguna
  if (!newUser.nama || !newUser.email || !newUser.password) {
    throw new Error('Data pengguna tidak lengkap')
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newUser.email)) {
    throw new Error('Format email tidak valid')
  }

  // Validasi panjang password
  if (newUser.password.length < 8) {
    throw new Error('Password harus memiliki minimal 8 karakter')
  }

  const user = await insertUser(newUser)
  return user
}

const deleteUserById = async (id) => {

  // logic sebelum delete nyari user dulu
  await getUserById(id)

  await deleteUser(id)

}

const editUserById = async (id, userData) => {
  await getUserById(id)

  const user = await editUser(id, userData)

  return user
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  editUserById
}