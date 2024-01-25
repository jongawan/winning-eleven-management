'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
 
      Store.hasMany(models.Employee)
      
    }
  }
  Store.init({
    name: DataTypes.STRING, 
    code: DataTypes.STRING,
    location: DataTypes.STRING,
    category: DataTypes.STRING
  }, 
  
  
  {
    hooks: {
      beforeCreate: (store, options) => {

        //console.log(store, ">>>>>")
        
        const d = new Date();
        let time = d.getTime();

        if (store.category === "Serie A"){
            store.code = `SEA-${time}`}
   
        if (store.category === "Laliga"){
            store.code = `LLG-${time}`}

        if (store.category === "English Premiere League"){
          store.code = `EPL-${time}`}
      }
      // afterValidate: (user, options) => {
      //   user.username = 'Toni';
      // }
    },
    sequelize,
    modelName: 'Store',
  });
  return Store;
};