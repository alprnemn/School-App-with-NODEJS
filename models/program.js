const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Program = sequelize.define("Program",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : {
            args : true,
            msg : "Programs are must be unique!!"
        }
    }
});

module.exports = Program;