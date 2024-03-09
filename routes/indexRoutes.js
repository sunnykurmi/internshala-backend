const express = require("express");
const {
  homepage,
  studentavatar,
  studentsignup,
  studentsignin,
  studentsignout,
  studentsendmail,
  currentuser,
  studentforgotlink,
  studentresetpassword,
  studentupdate,
  internshipdetail,
  jobdetail,
  applyinternship,
  deleteaccount,
  applyjob
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//get
router.get("/", homepage);

//post /student
router.post("/student", isAuthenticated, currentuser);

//post applications
router.post("/student/applications", isAuthenticated, currentuser);

//post/student/signup
router.post("/student/signup", studentsignup);

//post/student/signup
router.post("/student/signin", studentsignin);

//get/student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

//post/student/sendmail
router.post("/student/send-mail", studentsendmail);

//get/student/forgot-link
router.get("/student/forgotlink/:id", studentforgotlink);

//post/student/reset-password
router.post(
  "/student/reset-password/:id",
  // isAuthenticated,
  studentresetpassword
);
//post/student/delete-account
router.post("/student/delete-account/:id", isAuthenticated, deleteaccount);


//post/student/studentupdate
router.post("/student/studentupdate/:id", isAuthenticated, studentupdate);

//post/student/avatar
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

// ----------------------------------view internship --------------------------------
//post/internship/detail/:id
router.post("/internship/detail/:id", internshipdetail);

// ----------------------------------view job --------------------------------
//post/job/detail/:id
router.post("/job/detail/:id", jobdetail);

// ----------------------------------apply internships --------------------------------
//post/student/apply/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);

// ----------------------------------apply jobs --------------------------------
//post/student/apply/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

module.exports = router;
