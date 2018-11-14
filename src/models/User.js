// const Promise = require('bluebird')
// const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const bcrypt = require('bcrypt')

function hashPassword(user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  /*
  return bcrypt.genSaltSync(SALT_FACTOR).then(salt => bcrypt.hashASync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
  */

  console.log(`PWD BEFORE HASH: ${user.password}`)

  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  const hash = bcrypt.hashSync(user.password, salt)

  return user.setDataValue('password', hash)
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // attributes
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    // console.log(`DB PWD: ${this.password}`)
    console.log(`PLAIN PWD: ${password}`)
    // return bcrypt.compareSync(password, this.password)
    bcrypt.compare(password, this.password)
      .then(() => {
        console.log(`BCRYPT : TRUE`)
        return true
      })
      .catch(() => {
        console.log(`BCRYPT : FALSE`)
        return false
      })
  }

  return User
}
