const { catchError } = require("../middlewares/catchError");
const studentmodel = require("../models/studentmodel");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchError(async (req, res, next) => {
  const loggedinuserresume = await studentmodel
    .findById(req.id)
    .populate("resume")
    .exec();
  res.json({ message: "resume page", loggedinuserresume });
});

// ------------------------------------------education------------------------------------------

exports.addeducation = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "education added", student });
});

exports.editeducation = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const index = student.resume.education.findIndex(
    (i) => i.id === req.params.id
  );
  student.resume.education[index] = {
    ...student.resume.education[index],
    ...req.body,
  };
  await student.save();
  res.json({ message: "education added", student });
});

exports.deleteducation = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const filtereducation = student.resume.education.filter(
    (i) => i.id !== req.params.id
  );
  student.resume.education = filtereducation;
  await student.save();
  res.json({ message: "education deleted", student });
});

// ------------------------------------------jobs------------------------------------------

exports.addjobs = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "jobs added", student });
});

exports.editjobs = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const index = student.resume.jobs.findIndex((i) => i.id === req.params.id);
  student.resume.jobs[index] = {
    ...student.resume.jobs[index],
    ...req.body,
  };
  await student.save();
  res.json({ message: "jobs added", student });
});

exports.deletejobs = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const filterjobs = student.resume.jobs.filter((i) => i.id !== req.params.id);
  student.resume.jobs = filterjobs;
  await student.save();
  res.json({ message: "jobs deleted", student });
});

// ------------------------------------------internships------------------------------------------

exports.addintern = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "internships added", student });
});

exports.editintern = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const index = student.resume.internships.findIndex(
    (i) => i.id === req.params.id
  );
  student.resume.internships[index] = {
    ...student.resume.internships[index],
    ...req.body,
  };
  await student.save();
  res.json({ message: "internships added", student });
});

exports.deleteintern = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const filterinternships = student.resume.internships.filter(
    (i) => i.id !== req.params.id
  );
  student.resume.internships = filterinternships;
  await student.save();
  res.json({ message: "internships deleted", student });
});

// ------------------------------------------responsibilities------------------------------------------

exports.addresp = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "responsibilities added", student });
});

exports.editresp = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const index = student.resume.responsibilities.findIndex(
    (i) => i.id === req.params.id
  );
  student.resume.responsibilities[index] = {
    ...student.resume.responsibilities[index],
    ...req.body,
  };
  await student.save();
  res.json({ message: "responsibilities added", student });
});

exports.deleteresp = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const filterresponsibilities = student.resume.responsibilities.filter(
    (i) => i.id !== req.params.id
  );
  student.resume.responsibilities = filterresponsibilities;
  await student.save();
  res.json({ message: "responsibilities deleted", student });
});

// ------------------------------------------courses------------------------------------------

exports.addcourses = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "courses added", student });
});

exports.editcourses = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const index = student.resume.courses.findIndex((i) => i.id === req.params.id);
  student.resume.courses[index] = {
    ...student.resume.courses[index],
    ...req.body,
  };
  await student.save();
  res.json({ message: "courses added", student });
});

exports.deletecourses = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const filtercourses = student.resume.courses.filter(
    (i) => i.id !== req.params.id
  );
  student.resume.courses = filtercourses;
  await student.save();
  res.json({ message: "courses deleted", student });
});

// ------------------------------------------projects------------------------------------------

exports.addprojects = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "projects added", student });
});

exports.editprojects = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const index = student.resume.projects.findIndex(
    (i) => i.id === req.params.id
  );
  student.resume.projects[index] = {
    ...student.resume.projects[index],
    ...req.body,
  };
  await student.save();
  res.json({ message: "projects added", student });
});

exports.deleteprojects = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const filterprojects = student.resume.projects.filter(
    (i) => i.id !== req.params.id
  );
  student.resume.projects = filterprojects;
  await student.save();
  res.json({ message: "projects deleted", student });
});

// ------------------------------------------skills------------------------------------------

exports.addskills = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "skills added", student });
});

exports.editskills = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const index = student.resume.skills.findIndex((i) => i.id === req.params.id);
  student.resume.skills[index] = {
    ...student.resume.skills[index],
    ...req.body,
  };
  await student.save();
  res.json({ message: "skills added", student });
});

exports.deleteskills = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const filterskills = student.resume.skills.filter(
    (i) => i.id !== req.params.id
  );
  student.resume.skills = filterskills;
  await student.save();
  res.json({ message: "skills deleted", student });
});

// ------------------------------------------accomplishments------------------------------------------

exports.addacc = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "accomplishments added", student });
});

exports.editacc = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const index = student.resume.accomplishments.findIndex(
    (i) => i.id === req.params.id
  );
  student.resume.accomplishments[index] = {
    ...student.resume.accomplishments[index],
    ...req.body,
  };
  await student.save();
  res.json({ message: "accomplishments added", student });
});

exports.deleteacc = catchError(async (req, res, next) => {
  const student = await studentmodel.findById(req.id).exec();
  const filteraccomplishments = student.resume.accomplishments.filter(
    (i) => i.id !== req.params.id
  );
  student.resume.accomplishments = filteraccomplishments;
  await student.save();
  res.json({ message: "accomplishments deleted", student });
});
