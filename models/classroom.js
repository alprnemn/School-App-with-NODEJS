const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Classroom = sequelize.define("Classroom",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : {
            args : true,
            msg : "Classrooms are must be unique!!"
        }
    }
});

module.exports = Classroom;