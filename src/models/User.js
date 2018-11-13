module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    // attributes
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
  })
}
