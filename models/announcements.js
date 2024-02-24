const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Announcement = sequelize.define("Announcement",{

    title : {
        type : DataTypes.STRING,
        allowNull : false,
        len : {
            args : [5,45],
            msg : "Title must be between 5-45 characters long!"
        }
    },
    description : {
        type : DataTypes.STRING,
        allowNull: false,
        len : {
            args : [5,150]
        }
    },
    image : {
        type: DataTypes.STRING,
        allowNull : true,
        defaultValue: "../static/images/annn.jpg"
    }

});

module.exports = Announcement;