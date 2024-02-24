const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

// Define Student Model with Validations
const Student = sequelize.define("Student",{
    
    studentno : {
        type : DataTypes.BIGINT,
        allowNull : false,
        unique: {
            args: true,
            msg: "This Student No is already in use!"
        },
        validate : {
            isNumeric: true,
            notEmpty: true,
            notNull: true,
        }
    },
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
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: {
            args: true,
            msg: "This email is already in use!"
        },
        validate : {
            isEmail: {
                msg : "E-mail must be in e-mail format!"
            },
            notEmpty : {
                msg : "E-mail field cannot be empty!"
            },
            len: {
                args : [3,32],
                msg : "E-mail field must be between 3 and 32 characters long!"
            }
        }
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Password field cannot be empty!"
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[{\]};:<>|./?])[A-Za-z\d!@#$%^&*()\-_+=\[{\]};:<>|./?]{8,}$/,
                msg: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!"
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true, 
        validate: {
            is: {
                args: /^\+(?:[0-9] ?){6,14}[0-9]$/, 
                msg: "Invalid phone number format."
            }
        }
    },
    status : {
        type : DataTypes.BOOLEAN,
        allowNull : true,
        defaultValue : true
    },
    lastLogin : {
        type : DataTypes.DATE,
        allowNull : true,
    },
    resetToken : {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiration : {
        type: DataTypes.DATE,
        allowNull: true
    },
    image : {
        type: DataTypes.STRING(300),
        allowNull: true,
        defaultValue: "defaultuserss.jpg"
    }
});

module.exports = Student;