const express = require("express");
const router = express.Router();
const {
  resume,
  addeducation,
  editeducation,
  deleteducation,
  addjobs,
  editjobs,
  deletejobs,
  addintern,
  editintern,
  deleteintern,
  addresp,
  editresp,
  deleteresp,
  addcourses,
  editcourses,
  deletecourses,
  addprojects,
  editprojects,
  deleteprojects,
  addskills,
  editskills,
  deleteskills,
  addacc,
  editacc,
  deleteacc,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

//get
router.get("/", isAuthenticated, resume);

// ------------------------------------------education------------------------------------------
//post
router.post("/add-edu", isAuthenticated, addeducation);

//post
router.post("/edit-edu/:id", isAuthenticated, editeducation);

//post
router.post("/delete-edu/:id", isAuthenticated, deleteducation);

// ------------------------------------------jobs------------------------------------------
//post
router.post("/add-jobs", isAuthenticated, addjobs);

//post
router.post("/edit-jobs/:id", isAuthenticated, editjobs);

//post
router.post("/delete-jobs/:id", isAuthenticated, deletejobs);

// ------------------------------------------internships------------------------------------------
//post
router.post("/add-intern", isAuthenticated, addintern);

//post
router.post("/edit-intern/:id", isAuthenticated, editintern);

//post
router.post("/delete-intern/:id", isAuthenticated, deleteintern);

// ------------------------------------------responsibilities------------------------------------------
//post
router.post("/add-resp", isAuthenticated, addresp);

//post
router.post("/edit-resp/:id", isAuthenticated, editresp);

//post
router.post("/delete-resp/:id", isAuthenticated, deleteresp);

// ------------------------------------------courses------------------------------------------
//post
router.post("/add-courses", isAuthenticated, addcourses);

//post
router.post("/edit-courses/:id", isAuthenticated, editcourses);

//post
router.post("/delete-courses/:id", isAuthenticated, deletecourses);

// ------------------------------------------projects------------------------------------------
//post
router.post("/add-projects", isAuthenticated, addprojects);

//post
router.post("/edit-projects/:id", isAuthenticated, editprojects);

//post
router.post("/delete-projects/:id", isAuthenticated, deleteprojects);

// ------------------------------------------skills------------------------------------------
//post
router.post("/add-skills", isAuthenticated, addskills);

//post
router.post("/edit-skills/:id", isAuthenticated, editskills);

//post
router.post("/delete-skills/:id", isAuthenticated, deleteskills);

// ------------------------------------------accomplishment------------------------------------------
//post
router.post("/add-acc", isAuthenticated, addacc);

//post
router.post("/edit-acc/:id", isAuthenticated, editacc);

//post
router.post("/delete-acc/:id", isAuthenticated, deleteacc);

module.exports = router;
