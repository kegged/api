import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    }
  }, {
    tableName: 'city'
  })

  User.prototype.generateToken = async function() {
    const { userName, email, isAdmin, id } = this
    return jwt.sign({
      userName,
      email,
      isAdmin,
      id,
    }, 'secret')
  }

  User.prototype.checkPassword = async function(attempt) {
    const { hash } = this
    const isMatch = await bcrypt.compare(attempt, hash)
    return isMatch
  }

  return User
}
