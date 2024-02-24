const express = require("express"); 
const router = express.Router();  

// Controllers
const authController = require("../controllers/auth");

const imageUpload = require("../helpers/imageUpload")

// Middlewares
const isAuth = require("../middlewares/isAuth");
const csrf = require("../middlewares/csrf");

// Routes
router.post("/teacherManagementPanel",authController.post_teacherManagementPanel); // POST teacherManagementPanel
router.get("/teacherManagementPanel",csrf,authController.get_teacherManagementPanel); // GET teacherManagementPanel
router.post("/teacherpanel",authController.post_teacherpanel); // POST TEACHERPANEL
router.get("/teacherpanel",csrf,authController.get_teacherpanel); // GET TEACHERPANEL
router.get("/schedule",isAuth,authController.get_schedule); // GET SCHEDULE
router.post("/courseRegister",isAuth,authController.post_courseRegister); // POST COURSE REGISTER
router.get("/courseRegister",isAuth,csrf,authController.get_courseRegister); // GET COURSE REGISTER
router.post("/personal",isAuth,imageUpload.upload.single("imagepersonal"),authController.post_personal); // GET PERSONAL
router.get("/personal",isAuth,csrf,authController.get_personal); // GET PERSONAL
router.post("/new-password",authController.post_newPassword); // GET NEW PASSWORD
router.get("/new-password/:token",csrf,authController.get_newPassword); // GET NEW PASSWORD
router.post("/reset-password",authController.post_resetPassword); // GET RESET PASSWORD
router.get("/reset-password",csrf,authController.get_resetPassword); // GET RESET PASSWORD
router.get("/logout",isAuth,authController.get_logout); // GET LOGOUT
router.post("/",authController.post_login); // POST LOGIN
router.get("/",csrf,authController.get_login); // GET LOGIN
router.post("/register",authController.post_register); // POST REGISTER
router.get("/register",csrf,authController.get_register); // GET REGISTER
router.get("/home",isAuth,authController.get_home); // GET HOME

module.exports = router ;