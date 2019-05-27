'use strict'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        },
      },
    }
  )

  Users.associate = function(models) {
    // associations can be defined here
  }

  Users.prototype.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash)
  }

  Users.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET)
  }

  return Users
}
