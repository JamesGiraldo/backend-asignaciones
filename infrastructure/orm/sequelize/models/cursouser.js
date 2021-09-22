'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CursoUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // define association here
      CursoUser.belongsTo(models.Curso, { foreignKey: 'cursoID' })    
      CursoUser.belongsTo(models.User, { foreignKey: 'userID' })    

    }

  };
  CursoUser.init({
    userID: DataTypes.INTEGER,
    cursoID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CursoUser',
  });
  return CursoUser;
};