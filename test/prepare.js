import models from '@/models'
import { generateHash } from '@/utils'

// create admin global variables for use in
// various fixtures
async function setupAdminAccount () {
  const { salt, hash } = await generateHash('password')
  global.admin = {
    firstName: 'admin',
    lastName: 'admin',
    userName: 'admin',
    email: 'admin@admin.admin',
  }
  global.adminUser = await models.User.create({
    ...global.admin,
    isAdmin: true,
    salt,
    hash,
  })
  global.adminToken = await global.adminUser.generateToken()
}

export default (cb) => {
  models.sequelize.sync({ force: true }).then(async () => {
    await setupAdminAccount()
    cb()
  })
}
