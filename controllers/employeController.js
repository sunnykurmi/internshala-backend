const { catchError } = require("../middlewares/catchError");
const employemodel = require("../models/employeModel");
const internshipmodel = require("../models/internshipModel");
const jobmodel = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImagekit();
const path = require("path");

exports.homepage = catchError(async (req, res, next) => {
  res.json({ message: "employee homepage" });
});

exports.currentuser = catchError(async (req, res, next) => {
  const loggedinuser = await employemodel
    .findById(req.id)
    .populate({
      path: 'internships',
      populate: {
        path: 'students',
        model: 'student' // Assuming the name of the employe model is 'employe'
      }
    })
    .populate({
      path: 'jobs',
      populate: {
        path: 'students',
        model: 'student' // Assuming the name of the employe model is 'employe'
      }
    })

    .exec();
  res.json({ loggedinuser });
});

exports.employesignup = catchError(async (req, res, next) => {
  const newemploye = await new employemodel(req.body).save();
  sendtoken(newemploye, 201, res);
});

exports.employesignin = catchError(async (req, res, next) => {
  const foundemploye = await employemodel
    .findOne({
      email: req.body.email,
    })
    .select("+password")
    .exec();
  if (!foundemploye)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  const ismatched = foundemploye.comparepassword(req.body.password);
  if (!ismatched) return next(new ErrorHandler(" wrong credentials ", 500));
  sendtoken(foundemploye, 200, res);
});

exports.employesignout = catchError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signed out" });
});

exports.employesendmail = catchError(async (req, res, next) => {
  const emailemploye = await employemodel
    .findOne({ email: req.body.email })
    .exec();
  if (!emailemploye)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  const url = `${req.protocol}://${req.get("host")}/employe/forgot-link/${
    emailemploye._id
  }`;
  sendmail(req, res, next, url);
  (emailemploye.resetPasswordToken = "1"), await emailemploye.save();
  res.json({ emailemploye, url });
});

exports.employedeleteaccount = catchError(async (req, res, next) => {
  const emailstudent = await studentmodel
    .findByIdAndDelete({ _id: req.params.id })
    .exec();
  res.json({ message: "successfully deleted account" });
});

exports.deleteinternship = catchError(async (req, res, next) => {
  const emailstudent = await internshipmodel
    .findByIdAndDelete({ _id: req.params.id })
    .exec();
  res.json({ message: "successfully deleted internship" });
});

exports.deletejob = catchError(async (req, res, next) => {
  const emailstudent = await jobmodel
    .findByIdAndDelete({ _id: req.params.id })
    .exec();
  res.json({ message: "successfully deleted internship" });
});


exports.employeforgotlink = catchError(async (req, res, next) => {
  const emailemploye = await employemodel
    .findById({ _id: req.params.id })
    .exec();
  if (!emailemploye)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  if (emailemploye.resetPasswordToken == "1") {
    emailemploye.resetPasswordToken = "0";
    emailemploye.password = req.body.password;
    await emailemploye.save();
  } else {
    return next(new ErrorHandler("Invalid reset password link ", 500));
  }
  res.status(200).json({
    message: "successfully changed password",
  });
});

exports.employeresetpassword = catchError(async (req, res, next) => {
  const emailemploye = await employemodel
    .findById({ _id: req.params.id })
    .exec();
  emailemploye.password = req.body.password;
  await emailemploye.save();
  sendtoken(emailemploye, 200, res);
});

exports.employeupdate = catchError(async (req, res, next) => {
  const newemploye = await employemodel
    .findByIdAndUpdate(req.params.id, req.body)
    .exec();
  res.status(200).json({
    success: true,
    message: "employe updated successfully",
    newemploye,
  });
});

exports.employeavatar = catchError(async (req, res, next) => {
  const avataremploye = await employemodel.findById(req.params.id).exec();
  const file = req.files.organizationlogo;
  const modifyfilename = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  // if (avataremploye.organizationlogo.fileId !== "") {
  //   await imagekit.deleteFile(avataremploye.organizationlogo.fileId);
  // }
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifyfilename,
  });
  avataremploye.organizationlogo = { fileId, url };
  await avataremploye.save();
  res.status(200).json({
    success: true,
    message: "organizationlogo updated successfully",
  });
});

exports.createinternship = catchError(async (req, res, next) => {
  const loggedinuser = await employemodel.findById(req.id).exec();
  const newinternship = await new internshipmodel(req.body);
  newinternship.employe = loggedinuser._id;
  loggedinuser.internships.push(newinternship._id);
  await newinternship.save();
  await loggedinuser.save();
  res.status(200).json({ success: true, newinternship });
});

exports.readinternship = catchError(async (req, res, next) => {
  const { internships } = await employemodel
    .findById(req.id)
    .populate("internships")
    .exec();
  res.status(200).json({ success: true, internships });
});

exports.readsingleinternship = catchError(async (req, res, next) => {
  const internship = await internshipmodel.findById(req.params.id).exec();
  res.status(200).json({ success: true, internship });
});

exports.createjob = catchError(async (req, res, next) => {
  const loggedinuser = await employemodel.findById(req.id).exec();
  const newjob = await new jobmodel(req.body);
  newjob.employe = loggedinuser._id;
  loggedinuser.jobs.push(newjob._id);
  await newjob.save();
  await loggedinuser.save();
  res.status(200).json({ success: true, newjob });
});

exports.readjob = catchError(async (req, res, next) => {
  const { jobs } = await employemodel.findById(req.id).populate("jobs").exec();
  res.status(200).json({ success: true, jobs });
});

exports.readsinglejob = catchError(async (req, res, next) => {
  const job = await jobmodel.findById(req.params.id).exec();
  res.status(200).json({ success: true, job });
});
