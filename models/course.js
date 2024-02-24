const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Course = sequelize.define("Course",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : {
            args : true,
            msg : "Courses are must be unique!!"
        }
    },
    isElective: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false 
    }

});

module.exports = Course;