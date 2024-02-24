const express = require("express");
const {
    homepage,
    currentuser,
    employesignup,
    employesignin,
    employesignout,
    employesendmail,
    employeforgotlink,
    employeresetpassword,
    employeupdate,
    employeavatar,
    employedeleteaccount,
    createinternship,
    readinternship,
    readsingleinternship,
    deleteinternship,
    createjob,
    readjob,
    deletejob,
    readsinglejob,
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//get
router.get("/", homepage);

//post 
router.post("/current", isAuthenticated, currentuser);

//post/signup
router.post("/signup", employesignup);

//post/signup
router.post("/signin",employesignin)

//get/signout
router.get("/signout",isAuthenticated,employesignout)

//post/sendmail
router.post("/send-mail",employesendmail)

//get/forgot-link
router.get("/forgot-link/:id",employeforgotlink)

//post/reset-password
router.post("/reset-password/:id",isAuthenticated,employeresetpassword)

//post/delete-account
router.post("/delete-account/:id", isAuthenticated, employedeleteaccount);

//post/employeupdate
router.post("/employeupdate/:id",isAuthenticated,employeupdate)

//post/avatar
router.post("/avatar/:id",isAuthenticated,employeavatar)

//post/delete/ internship
router.post("/delete/internship/:id",isAuthenticated,deleteinternship)

//post/delete/ job
router.post("/delete/job/:id",isAuthenticated,deletejob)

// ------------------------------------------internships------------------------------------------
//post/internship/create
router.post("/internship/create",isAuthenticated,createinternship)

//post/internship/read
router.post("/internship/read",isAuthenticated,readinternship)

//post/internship/read
router.post("/internship/read/:id",isAuthenticated,readsingleinternship)

// ------------------------------------------jobs------------------------------------------
//post/job/create
router.post("/job/create",isAuthenticated,createjob)

//post/job/read
router.post("/job/read",isAuthenticated,readjob)

//post/job/read
router.post("/job/read/:id",isAuthenticated,readsinglejob)

module.exports = router;
