// berkomunikasi dengan database
// bisa pake ORM, boleh raw querty

const prisma = require('../db')

const findUsers = async () => {
  const users = await prisma.user.findMany()
  return users

}

module.exports = {
  findUsers,
}