module.exports = (request,response,next) => {
    if(!request.session.isAuth){
        return response.redirect("/?returnUrl=" + request.originalUrl);
    }
    next();
};