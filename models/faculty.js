const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Faculty = sequelize.define("Faculty",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : {
            args : true,
            msg : "Faculties are must be unique!!"
        }
    }
});

module.exports = Faculty;