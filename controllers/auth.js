const Faculty = require("../models/faculty");
const Program = require("../models/program");
const Student = require("../models/student");

const generateStudentNo = require("../helpers/studentno");
const emailService = require("../helpers/sendMail");
const bcrypt = require("bcrypt");
const config = require("../config");
const crypto = require("crypto");
const { Op } = require("sequelize");
const todaydate = require("../helpers/date");
const Announcement = require("../models/announcements");
const fs = require("fs");
const Course = require("../models/course");
const Teacher = require("../models/teacher");
const CourseRegistration = require("../models/courseRegistiration");
const Classroom = require("../models/classroom");

// POST TEACHERMANAGEMENT
exports.post_teacherManagementPanel = async (request, response) => {

    const { dayofweek, starttime, endtime, classroom, checkbox1, checkbox2, checkbox3 } = request.body;

    console.log(request.body)

    try {
        // Create an array to hold the checkbox values
        const checkboxes = [checkbox1, checkbox2, checkbox3];

        // Loop through each checkbox value
        for (let i = 0; i < dayofweek.length; i++) {
                const courseId = request.body.courseid[i];

                if (checkboxes[i] === "on"){
                    const isConfirmed = true;
                
                
                // Update the corresponding course registration with the given courseId
                await CourseRegistration.update({
                    dayofWeek: dayofweek[i],
                    startTime: starttime[i],
                    endTime: endtime[i],
                    ClassroomId: classroom[i],
                    isConfirmed : isConfirmed
                },{
                    where: {
                        CourseId: courseId
                    }
                });
              
            }
        }
        
        request.session.message = { text: "Confirm Success", class: "green" };
        return response.redirect("/teacherManagementPanel");
    } catch (error) {
        console.log("error:", error);
    }
};

// GET TEACHERMANAGEMENT
exports.get_teacherManagementPanel = async(request,response) => {

    const teacherid = request.session.teacherid;

    try {
        const teacher = await Teacher.findOne({
            where : {
                id : teacherid
            },
            include : {
                model : Faculty,
                attributes : ["name"]
            }
        });

        const coursesregistrations = await CourseRegistration.findAll({
            where: {
                TeacherId : teacher.id
            },
            include : [
                {model : Student,attributes:["firstname","lastname","studentno"]},
                {model : Course,attributes:["name"]},
            ]
        });

        const classrooms = await Classroom.findAll({
            raw:true
        });

        return response.render("teacherManagementPanel",{
            teacher : teacher,
            coursesregistrations : coursesregistrations,
            classrooms : classrooms
        })


    } catch (error) {
        console.log("error : ",error)
    }
}

// POST TEACHER PANEL
exports.post_teacherpanel = async (request,response) => {

    const teachername = request.body.teachername;

    try {
        const teacher = await Teacher.findOne({
            where: {
                firstname : teachername
            }
        });

        if(!teacher) {
            request.session.message = {text : "Wrong Name",class : "red"}
            return response.redirect("teacherPanel")
        }

        request.session.teacherid = teacher.id;
        return response.redirect("teacherManagementPanel")

    } catch (error) {
        console.log("error:",error)
    }
}

// GET TEACHER PANEL
exports.get_teacherpanel = async (request,response) => {

    response.render("teacherPanel");

}

// GET SCHEDULE
exports.get_schedule = async(request,response) => {

    try {
        const student = await Student.findOne({
            where : {
                id : request.session.studentid
            }
        });

        const coursesregistration = await CourseRegistration.findAll({
            where : {
                StudentId : student.id,
                isConfirmed : true
            },
            include :[
                {
                    model : Course,
                    attributes : ["name"]
                },
                {
                    model : Teacher,
                    attributes : ["firstname"]
                },
                {
                    model : Classroom,
                    attributes : ["name"]
                }
            ]

        });

        return response.render("schedule",{
            student : student,
            coursesregistrations : coursesregistration
        });

    } catch (error) {
        console.log("error : ",error);
    }
};

// POST COURSE REGISTER
exports.post_courseRegister = async (request,response) => {

    const course1 = request.body.course1;
    const course2 = request.body.course2;
    const course3 = request.body.course3;

    try {

        const student = await Student.findOne({
            where : {
                id : request.session.studentid
            }
        });

        const teacher = await Teacher.findOne({
            where : {
                FacultyId : student.FacultyId
            }
        });

        await CourseRegistration.bulkCreate([{
            StudentId : student.id,
            TeacherId : teacher.id,
            CourseId : course1
        },{
            StudentId : student.id,
            TeacherId : teacher.id,
            CourseId : course2
        },{
            StudentId : student.id,
            TeacherId : teacher.id,
            CourseId : course3
        },]);

        request.session.message = {text : "basarili ders secimi",class : "green"}
        return response.redirect("courseRegister")

    } catch (error) {
        console.log("error: ",error)
    }

};

// GET COURSE REGISTER
exports.get_courseRegister = async (request,response) => {

    const message = request.session.message;
    delete request.session.message;

    const studentid = request.session.studentid;

    try {

        const student = await Student.findOne({
            where: {
                id : studentid
            }
        });

        const courses = await Course.findAll({
            where : {
                FacultyId : student.FacultyId,
                isElective : false
            }
        });

        const electiveCourses = await Course.findAll({
            where : {
                isElective : true,
                FacultyId : student.FacultyId
            }
        });

        return response.render("courseRegister",{
            student : student,
            courses : courses,
            electiveCourses : electiveCourses,
            message : message
        });
        
    } catch (error) {
        console.log("error :",error)
    }

};

// POST PERSONAL
exports.post_personal = async (request,response) => {

    const studentId = request.session.studentid;
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const phone = request.body.phonenumber;
    let studentimage = request.body.imagepersonal;

    if (request.file) {
        
        studentimage = request.file.filename;
    
        fs.unlink(`./public/images/${request.body.imagepersonal}`,error => { 
            console.log("fsunink error: ",error)
        })
    }


   try {
        const student = await Student.update({
            firstname : firstname,
            lastname : lastname,
            phone : phone,
            image : studentimage
        },{
            where : {
                id : studentId
            }
        });

        return response.redirect("personal");
        
   } catch (error) {
    console.log("error:" ,error)
   }

};

// GET PERSONAL
exports.get_personal = async(request,response) => {

    const studentId = request.session.studentid;

    try {

        const student = await Student.findOne({
            where : {
                id : studentId
            }
        })

        return response.render("personal",{
            student : student
        });

    } catch (error) {
        console.log("error: ",error)
    }

};

// POST NEW PASSWORD
exports.post_newPassword = async (request,response) => {

    const token = request.body.token;
    const studentid = request.body.studentid;
    const newpassword = request.body.newpassword;
    const confirmnewpassword = request.body.confirmnewpassword;
    try {
        if(newpassword !== confirmnewpassword) {
            request.session.message = {text:"Password are not same",class: "red"}
            return response.redirect("/");
        }

        const student = await Student.findOne({
            where : {
                resetToken : token,
                id : studentid,
                resetTokenExpiration : {
                    [Op.gt] : Date.now()
                }
            }
        });

        if (student) {

            const hashedNewPassword = await bcrypt.hash(newpassword,10);
            student.password = hashedNewPassword;
            student.resetToken = null;
            await student.save();

            request.session.message = {text : "Password reset succesfully" , class : "green"}
            return response.redirect("/")
        }else {
            request.session.message = {text : "hataaaa",class:"orange"}
            return response.redirect("new-password")
        }
    } catch (error) {
        console.log("error :" ,error);
    }
};

// GET NEW PASSWORD
exports.get_newPassword = async(request,response) => {

    const token = request.params.token;

    const message = request.session.message;
    delete request.session.message;

    try {
        
        const student = await Student.findOne({
            where: {
                resetToken : token,
                resetTokenExpiration : {
                    [Op.gt] : Date.now()
                }
            }
        });

        return response.render("newPassword",{
            token : token,
            studentId : student.id,
            message : message
        });

    } catch (error) {
        console.log("error : ",error)
    }


};

// POST RESET PASSWORD
exports.post_resetPassword = async (request,response) => {

    const studentno = request.body.studentno;
    const email = request.body.email;

    try {

        // create token to reset password 
        var token = crypto.randomBytes(32).toString("hex");

        const student = await Student.findOne({
            where : {
                studentno : studentno,
                email : email
            }
        });
        
        if(!student) {
            request.session.message = {text : "This email or studentno was not found",class:"red"}
            return response.redirect("/reset-password")
        };
        
        student.resetToken = token;
        student.resetTokenExpiration = Date.now() + (1000 * 60 * 60);
        await student.save();
        
        emailService.sendMail({
            from:config.email.from,
            to : student.email,
            subject : "Reset password",
            html : ` <p> Click to reset your password <a href="http://127.0.0.1:3000/new-password/${token}">Reset Password</a></p>`
        });

        request.session.message = {text : "E-mail sent",class:"green"}
        return response.redirect("/")
    } catch (error) {
        console.log("error :",error)
    }
};

// GET RESET PASSWORD
exports.get_resetPassword = async (request,response) => {

    const message = request.session.message;
    delete request.session.message;

    response.render("resetPassword",{
        message : message
    });

};

// GET LOGOUT
exports.get_logout = async (request,response) => {

    try {

        await request.session.destroy();

        return response.redirect("/");

    } catch (error) {
        console.log("error : ",error)
    }
};

// POST LOGIN
exports.post_login = async (request,response) => {

    const studentNo = request.body.studentno;
    const password = request.body.password;

    try {
        
        const student = await Student.findOne({
            where : {
                studentno : studentNo
            },
            include :[
                {
                    model : Faculty,
                    attributes : ["name"]
                },
                {
                    model : Program,
                    attributes : ["name"]
                }
            ]
        });

        if (!student) {
            return response.redirect("/");
        }

        const match = await bcrypt.compare(password,student.password);

        if(match) {

            student.lastLogin = Date.now();
            // sessions
            request.session.isAuth = true;
            request.session.studentid = student.id;
            request.session.firstname = student.firstname;
            request.session.lastname = student.lastname;
            request.session.studentno = student.studentno;
            request.session.email = student.email;
            request.session.phone = student.phone;
            request.session.faculty = student.Faculty.name;
            request.session.program = student.Program.name;
            request.session.lastlogin = todaydate;
            request.session.status = student.status ? student.status : false;
            request.session.image = student.image;
            request.session.todaydate = todaydate;

            // redirect after login - returnUrl varsa returnUrl ye dondur
            const url = request.query.returnUrl ? request.query.returnUrl : "/home";
            return response.redirect(url);

        }else{
            return response.redirect("/");
        }

    } catch (error) {
        console.log("error : ",error);
    }

};

// GET LOGIN
exports.get_login = async (request,response) => {

    const message = request.session.message;
    delete request.session.message;

    response.render("login",{
        message:message
    });

};

// POST REGISTER
exports.post_register= async (request,response) => {

    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const faculty = request.body.faculty;
    const program = request.body.program;
    const email = request.body.email;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;
    const hashedPassword = await bcrypt.hash(password,10);

    try {   
        
        const student = await Student.findOne({
            where : {
                email : email
            }
        })  

        if (student) {
            request.session.message = {text : "This email is already in use!" , class:"red"}
            return response.redirect("register")
        }

        const studentNo = generateStudentNo();

        const newStudent = await Student.create({
            firstname : firstname,
            lastname : lastname,
            studentno: studentNo,
            email : email,
            password : hashedPassword,
            lastLogin : Date.now(),
            FacultyId : faculty,
            ProgramId : program
        });

        // Send email studentno and email
        emailService.sendMail({
            from : config.email.from,
            to: newStudent.email,
            subject : "Your account has been created",
            html : `<h2> Your email to log in: <h1 style="color:green;">${newStudent.email}</h1> </h2>
            <h2> Your student number to log in: <h1 style="color:green;">${newStudent.studentno}</h1> </h2>`
        })

        

        request.session.message = {text : "Your account has been created successfully",class:"green"}
        return response.redirect("/");

    } catch (error) {
        console.log("error : ",error)
    }
};

// GET REGISTER
exports.get_register = async (request,response) => {

    const message = request.session.message;
    delete request.session.message;

    try {
        
        const faculties = await Faculty.findAll({
            raw:true
        });

        const programs = await Program.findAll({
            raw : true
        });

        return response.render("register",{
            faculties : faculties,
            programs : programs,
            message:message
        });

    } catch (error) {
        console.log("Error: ",error)
    }

};

// GET HOME
exports.get_home = async (request,response) => {

    const studentId = request.session.studentid;

    try {

        const student = await Student.findOne({
            where : {
                id : studentId
            }
        });

        const announcements = await Announcement.findAll({
            raw : true
        })

        return response.render("home",{
            announcements : announcements,
            student : student
        });
    } catch (error) {
        console.log("error: ",error)
    }

    
};