const { catchError } = require("../middlewares/catchError");
const studentmodel = require("../models/studentmodel");
const ErrorHandler = require("../utils/ErrorHandler");
const internshipmodel = require("../models/internshipModel");
const jobmodel = require("../models/jobModel");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImagekit();
const path = require("path");

exports.homepage = catchError(async (req, res, next) => {
  const allinternships = await internshipmodel
    .find()
    .populate("employe")
    .exec();
  const alljobs = await jobmodel.find().populate("employe").exec();
  res.json({ message: "homepage", alljobs, allinternships });
});

exports.studentsignup = catchError(async (req, res, next) => {
  const newStudent = await new studentmodel(req.body).save();
  sendtoken(newStudent, 201, res);
});

exports.currentuser = catchError(async (req, res, next) => {
  const loggedinuser = await studentmodel
    .findById(req.id)
    .populate({
      path: "appliedinternships",
      populate: {
        path: "employe",
        model: "employe", // Assuming the name of the employe model is 'employe'
      },
    })
    .populate({
      path: "appliedjobs",
      populate: {
        path: "employe",
        model: "employe", // Assuming the name of the employe model is 'employe'
      },
    })
    .exec();

  const allinternships = await internshipmodel.find().exec();

  res.json({ loggedinuser, allinternships });
});

exports.studentsignin = catchError(async (req, res, next) => {
  const foundstudent = await studentmodel
    .findOne({
      email: req.body.email,
    })
    .select("+password")
    .exec();
  if (!foundstudent)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  const ismatched = foundstudent.comparepassword(req.body.password);
  if (!ismatched) return next(new ErrorHandler(" wrong credentials ", 500));
  sendtoken(foundstudent, 200, res);
});

exports.studentsignout = catchError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signed out" });
});

exports.studentsendmail = catchError(async (req, res, next) => {
  const emailstudent = await studentmodel
    .findOne({ email: req.body.email })
    .exec();
  if (!emailstudent)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  const url = `${req.protocol}://${req.get("host")}/student/forgot-link/${
    emailstudent._id
  }`;
  sendmail(req, res, next, url);
  (emailstudent.resetPasswordToken = "1"), await emailstudent.save();
  res.json({ emailstudent, url });
});

exports.studentforgotlink = catchError(async (req, res, next) => {
  const emailstudent = await studentmodel
    .findById({ _id: req.params.id })
    .exec();
  if (!emailstudent)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  if (emailstudent.resetPasswordToken == "1") {
    emailstudent.resetPasswordToken = "0";
    emailstudent.password = req.body.password;
    await emailstudent.save();
  } else {
    return next(new ErrorHandler("Invalid reset password link ", 500));
  }
  res.status(200).json({
    message: "successfully changed password",
  });
});

exports.studentresetpassword = catchError(async (req, res, next) => {
  const emailstudent = await studentmodel
    .findById({ _id: req.params.id })
    .exec();
  emailstudent.password = req.body.password;
  await emailstudent.save();
  sendtoken(emailstudent, 200, res);
});

exports.deleteaccount = catchError(async (req, res, next) => {
  const emailstudent = await studentmodel
    .findByIdAndDelete({ _id: req.params.id })
    .exec();
  res.json({ message: "successfully deleted account" });
});

exports.studentupdate = catchError(async (req, res, next) => {
  const { id } = req.params; // Retrieve the id from req.params
  const newStudent = await studentmodel
    .findByIdAndUpdate(id, req.body, { new: true }) // Update document and get the updated one
    .exec();
  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    newStudent,
  });
});

exports.studentavatar = catchError(async (req, res, next) => {
  const { id } = req.params; // Retrieve the id from req.params
  const avatarstudent = await studentmodel.findById(id).exec();
  const file = req.files.avatar;
  console.log(file);
  const modifyfilename = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  // if (avatarstudent.avatar.fileId !== "") {
  //   await imagekit.deleteFile(avatarstudent.avatar.fileId);
  // }
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifyfilename,
  });
  avatarstudent.avatar = { fileId, url };
  await avatarstudent.save();
  res.status(200).json({
    success: true,
    message: "profile image updated successfully",
  });
});

// ----------------view internahip ----------------
exports.internshipdetail = catchError(async (req, res, next) => {
  const internship = await internshipmodel
    .findById(req.params.id)
    .populate("employe")
    .exec();
  res.json({ internship });
});

// ----------------view jobs ----------------
exports.jobdetail = catchError(async (req, res, next) => {
  const job = await jobmodel.findById(req.params.id).populate("employe").exec();
  res.json({ job });
});

// ----------------apply internahips ----------------
exports.applyinternship = catchError(async (req, res, next) => {
  const loggedinuser = await studentmodel.findById(req.id).exec();
  const internship = await internshipmodel
    .findById(req.params.internshipid)
    .exec();
  loggedinuser.appliedinternships.push(internship._id);
  internship.students.push(loggedinuser._id);
  await loggedinuser.save();
  await internship.save();
  res.json({ loggedinuser, internship });
});

// ----------------apply internahips ----------------
exports.applyjob = catchError(async (req, res, next) => {
  const loggedinuser = await studentmodel.findById(req.id).exec();
  const job = await jobmodel.findById(req.params.jobid).exec();
  loggedinuser.appliedjobs.push(job._id);
  job.students.push(loggedinuser._id);
  await loggedinuser.save();
  await job.save();
  res.json({ loggedinuser, job });
});
