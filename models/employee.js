'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Store)
    }

    static getEmployeesByPosition(){

    }

    
  }
  Employee.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill out your first name.'
        },
        notEmpty: {
          msg: 'Please fill out your first name.'
        }
      }
    },
    
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill out your last name.'
        },
        notEmpty: {
          msg: 'Please fill out your last name.'
        }
      }
    },
    
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
      
        notNull: {
          msg: 'Please fill out your date of birth.'
        },
        notEmpty: {
          msg: 'Please fill out your date of birth.'
        },
        customValidator(value) {
          const currentDate = new Date();
          let minimumAge = currentDate.getFullYear() - 17;
          //console.log(minimumAge, ">>> minimum age")
     
          //console.log(ageNow, ">>>>>>> Age Now")
          if(this.dateOfBirth){
            if ((this.dateOfBirth.getFullYear() > minimumAge)) {
              throw new Error ("Age is too young - sorry.");
            }
         
          }

        
        }
      }
    },
  
    education: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill out your last education.'
        },
        notEmpty: {
          msg: 'Please fill out your last education.'
        },
        notSMA_notS1 (value){
          
          // console.log((this.education === "S2" || this.education === "S3") && 
          // (this.position === "Staff" || this.position === "Supervisor"), '<<<<<<');
          if((this.education === "S2" || this.education === "S3") && 
          (this.position === "Staff" || this.position === "Supervisor"))
          {          
            throw new Error('S2 and S3 graduates can only apply for Manager and CEO positions.')
          }
        }
      }
    },
  
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill out your position.'
        },
        notEmpty: {
          msg: 'Please fill out your position.'
        }
      }
    },
  
    StoreId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill out your salary.'
        },
        notEmpty: {
          msg: 'Please fill out your salary.'
        },

      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  
  return Employee;
  };
  
  