const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Teacher = sequelize.define("Teacher",{
    firstname : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            is: {
                args: /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/,
                msg: "Name can only contain letters!"
            },
            notEmpty : {
                msg : "Name field cannot be empty!"
            },
            len: {
                args : [3,12],
                msg : "Name field must be between 3 and 12 characters long!"
            }
        }
    },
    lastname : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            is: {
                args: /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/,
                msg: "Lastname can only contain letters!"
            },
            notEmpty : {
                msg : "Lastname field cannot be empty!"
            },
            len: {
                args : [3,12],
                msg : "Lastame field must be between 3 and 12 characters long!"
            }
        }
    }
});

module.exports = Teacher;