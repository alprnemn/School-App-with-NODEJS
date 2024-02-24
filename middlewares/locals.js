module.exports = (request,response,next) => {

    response.locals.isAuth = request.session.isAuth;
    response.locals.studentid = request.session.studentid;
    response.locals.firstname = request.session.firstname;
    response.locals.lastname = request.session.lastname;
    response.locals.studentno = request.session.studentno;
    response.locals.email = request.session.email;
    response.locals.phone = request.session.phone;
    response.locals.faculty = request.session.faculty;
    response.locals.program = request.session.program;
    response.locals.lastlogin = request.session.lastlogin;
    response.locals.status = request.session.status;
    response.locals.image = request.session.image;
    response.locals.todaydate = request.session.todaydate;
    response.locals.teacherid = request.session.teacherid;
    
    next(); 
};