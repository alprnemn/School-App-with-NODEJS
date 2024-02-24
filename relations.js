const Student = require("./models/student");
const Teacher = require("./models/teacher");
const Classroom = require("./models/classroom");
const Faculty = require("./models/faculty");
const Program = require("./models/program");
const Course = require("./models/course");
const CourseRegistration = require("./models/courseRegistiration");

module.exports = () => {

    Faculty.hasMany(Student);
    Student.belongsTo(Faculty);

    Faculty.hasMany(Program);
    Program.belongsTo(Faculty);

    Program.hasMany(Student);
    Student.belongsTo(Program);

    Faculty.hasMany(Teacher);
    Teacher.belongsTo(Faculty);

    Faculty.hasMany(Course);
    Course.belongsTo(Faculty);

    Teacher.hasMany(Course);
    Course.belongsTo(Teacher);

    Program.hasMany(Course);
    Course.belongsTo(Program);

    CourseRegistration.belongsTo(Student);
    Student.hasMany(CourseRegistration);

    CourseRegistration.belongsTo(Course);
    Course.hasMany(CourseRegistration);

    CourseRegistration.belongsTo(Teacher);
    Teacher.hasMany(CourseRegistration);

    CourseRegistration.belongsTo(Classroom);
    Classroom.hasMany(CourseRegistration);
    
};