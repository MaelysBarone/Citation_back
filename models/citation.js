'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Citation extends Model {
    static associate(models) {
    }
  };
  Citation.init({
    autor: DataTypes.STRING,
    citation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Citation',
  });
  return Citation;
};