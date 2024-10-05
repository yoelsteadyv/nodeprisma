// berkomunikasi dengan database
// bisa pake ORM, boleh raw querty

const prisma = require('../db')

const findUsers = async () => {
  const users = await prisma.user.findMany()
  return users

}

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  })
  return user
}

// nyari nama
const findUserByName = async (nama) => {
  const user = await prisma.user.findFirst({
    where: {
      nama,
    }
  })
  return user
}

const insertUser = async (userData) => {
  const user = await prisma.user.create({
    data: {
      nama: userData.nama,
      email: userData.email,
      password: userData.password
    },

  });
  return user
}

const deleteUser = async (id) => {

  await prisma.user.delete({
    where: {
      id,
    }
  })
}

const editUser = async (id, userData) => {
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
  findUsers,
  findUserById,
  insertUser,
  findUserByName,
  deleteUser,
  editUser
}