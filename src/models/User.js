module.exports = (sequelize, DataTypes) => {
  sequelize.define('User', {
    // attributes
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
  })
}
