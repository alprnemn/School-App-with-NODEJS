const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const CourseRegistration = sequelize.define("CourseRegistration",{

    isConfirmed : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    dayofWeek: {
        type: DataTypes.ENUM,
        values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        allowNull: true
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: true
    }
});

module.exports = CourseRegistration;