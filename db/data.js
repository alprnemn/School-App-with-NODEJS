// models
const Course = require("../models/course");
const Faculty = require("../models/faculty");
const Program = require("../models/program");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Announcement = require("../models/announcements");

const bcrypt = require('bcrypt');
const CourseRegistration = require("../models/courseRegistiration");
const Classroom = require("../models/classroom");

async function data() {

    const count = await Student.count();

    if(count == 0 ) {

        const faculties = await Faculty.bulkCreate([
            { name : "Faculty of Engineering"},
            { name : "Faculty of Law"},
            { name : "Faculty of Social Sciences"},
            { name : "Faculty of Business Administration"},
            { name : "Faculty of Information Technology"}

        ]);

        const programs = await Program.bulkCreate([
                    { name: "Computer Engineering", FacultyId: 1 },
                    { name: "Electrical Engineering", FacultyId: 1 },
                    { name: "Mechanical Engineering", FacultyId: 1 },
                    { name: "Civil Engineering", FacultyId: 1 },
                
                    { name: "Law", FacultyId: 2 },
                    { name: "Criminal Justice", FacultyId: 2 },
                    { name: "International Law", FacultyId: 2 },
                
                    { name: "Psychology", FacultyId: 3 },
                    { name: "Sociology", FacultyId: 3 },
                    { name: "Anthropology", FacultyId: 3 },
                
                    { name: "Business Administration", FacultyId: 4 },
                    { name: "Marketing", FacultyId: 4 },
                    { name: "Finance", FacultyId: 4 },
                
                    { name: "Computer Science", FacultyId: 5 },
                    { name: "Information Systems", FacultyId: 5 },
                    { name: "Software Engineering", FacultyId: 5 }
                ]);
                
        const students = await Student.bulkCreate([
            {
                studentno: 20242424,
                firstname : "Alperen" ,
                lastname : "Emin",
                email : "alprnemn@hotmail.com",
                password : await bcrypt.hash("123123",10),
                status : true
            },
            {
                studentno: 20242425,
                firstname : "Ahmetcan" ,
                lastname : "Emin",
                email : "ahmetcn@hotmail.com",
                password : await bcrypt.hash("123123",10),
                status : true
            }
        ]);

        await students[0].setFaculty(faculties[0])
        await students[1].setFaculty(faculties[0])
        await students[0].setProgram(programs[0])
        await students[1].setProgram(programs[1])
        

        

        const teachers = await Teacher.bulkCreate([
            { firstname: "Robert", lastname: "Johnson",FacultyId : 1 },
            { firstname: "Mary", lastname: "Williams",FacultyId : 2 },
            { firstname: "Christopher", lastname: "Brown",FacultyId : 3},
            { firstname: "Jennifer", lastname: "Miller",FacultyId : 4 },
            { firstname: "Daniel", lastname: "Wilson" ,FacultyId : 5}
        ]);

        const courses = await Course.bulkCreate([
            { name: "Introduction to Programming", ProgramId: 1,FacultyId:1 ,TeacherId: 1, isElective: false },
            { name: "Data Structures and Algorithms", ProgramId: 1,FacultyId:1 , TeacherId: 1, isElective: true },
            { name: "Database Management Systems", ProgramId: 1,FacultyId:1 , TeacherId: 1, isElective: false },
            { name: "Linear Algebra", ProgramId: 1, TeacherId: 1,FacultyId:1 , isElective: false },
            { name: "Differential Equations", ProgramId: 1,FacultyId:1 , TeacherId: 1, isElective: true },
            { name: "Software Development", ProgramId: 1,FacultyId:1 , TeacherId: 1, isElective: false },
        
            { name: "Constitutional Law", ProgramId: 2,FacultyId:2 , TeacherId: 2, isElective: false },
            { name: "Criminal Procedure", ProgramId: 2,FacultyId:2 ,FacultyId:2 , TeacherId: 2, isElective: true },
            { name: "Contracts", ProgramId: 2,FacultyId:2 , TeacherId: 2, isElective: false },
            { name: "International Criminal Law", ProgramId: 2,FacultyId:2 , TeacherId: 2, isElective: false },
            { name: "Tort Law", ProgramId: 2,FacultyId:2 , TeacherId: 2, isElective: true },
            { name: "Legal Writing", ProgramId: 2,FacultyId:2 , TeacherId: 2, isElective: false },
        
            { name: "Introduction to Psychology", ProgramId: 3,FacultyId:3 , TeacherId: 3, isElective: false },
            { name: "Social Psychology", ProgramId: 3,FacultyId:3 , TeacherId: 3, isElective: true },
            { name: "Cultural Anthropology", ProgramId: 3,FacultyId:3 , TeacherId: 3, isElective: false },
            { name: "Developmental Psychology", ProgramId: 3,FacultyId:3 , TeacherId: 3, isElective: false },
            { name: "Abnormal Psychology", ProgramId: 3,FacultyId:3 , TeacherId: 3, isElective: true },
            { name: "Human Evolution", ProgramId: 3,FacultyId:3 , TeacherId: 3, isElective: false },
        
            { name: "Principles of Marketing", ProgramId: 4,FacultyId:4 , TeacherId: 4, isElective: false },
            { name: "Financial Accounting", ProgramId: 4,FacultyId:4 , TeacherId: 4, isElective: true },
            { name: "Business Ethics", ProgramId: 4,FacultyId:4 , TeacherId: 4, isElective: false },
            { name: "Managerial Accounting", ProgramId: 4,FacultyId:4 , TeacherId: 4, isElective: false },
            { name: "Operations Management", ProgramId: 4,FacultyId:4 , TeacherId: 4, isElective: true },
            { name: "Strategic Management", ProgramId: 4,FacultyId:4 , TeacherId: 4, isElective: false },
        
            { name: "Introduction to Computer Science", ProgramId: 5,FacultyId:5 , TeacherId: 5, isElective: false },
            { name: "Web Development", ProgramId: 5,FacultyId:5 , TeacherId: 5, isElective: true },
            { name: "Software Engineering Principles", ProgramId: 5,FacultyId:5 , TeacherId: 5, isElective: false },
            { name: "Computer Networks", ProgramId: 5,FacultyId:5 , TeacherId: 5, isElective: false },
            { name: "Mobile App Development", ProgramId: 5,FacultyId:5 , TeacherId: 5, isElective: true },
            { name: "Human-Computer Interaction", ProgramId: 5,FacultyId:5 , TeacherId: 5, isElective: false }
        ]);

        const announcements = await Announcement.bulkCreate([
            { title : "Summer School Course Schedule Announced!",
            description : "The course schedule for the summer semester has been announced. Please check the schedule before selecting your courses."},
            { title : "Scholarship Applications Now Open!",
            description : "Applications for scholarships for the upcoming academic year are now open. Contact our scholarship office for details."},
            { title : "Change in Graduation Ceremony Date!",
            description : "The date for the graduation ceremony has been changed. Please check our calendar for the new date."}
        ]);

        const classrooms = await Classroom.bulkCreate([
            { name : "A-1"},
            { name : "A-2"},
            { name : "A-3"},
            { name : "B-1"},
            { name : "B-2"},
        ]);
}
};

module.exports = data;