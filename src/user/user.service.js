// service layer bertujuan untuk handle business logic
// kenapa dipisah ? supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

const prisma = require('../db')

const getAllUsers = async () => {
  const users = await prisma.user.findMany()

  return users
}

const getUserById = async (id) => {
  if (typeof id !== 'number') {
    throw Error('ID is not a number')
  }


  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  })
  if (!user) {
    throw Error('User not found')
  }

  return user
}

module.exports = {
  getAllUsers,
  getUserById
}