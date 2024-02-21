const nodemailer = require('nodemailer')
const ErrorHandler = require('./ErrorHandler')

exports.sendmail = (req, res, next, url) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465, 
        auth: {
            user: process.env.MYMAIL,
            pass: process.env.MYMAILPASSWORD,
        }
    })

    const mailoptions = {
        from: "Internshala HR",
        to: req.body.email,
        subject: "Password reset link",
        html: `<h1>click link below to reset password</h1>
        <a href="${url}">password reset link</a>
        `
    }

    transport.sendMail(mailoptions, (err, info) => { 
        if (err) return next(new ErrorHandler(err, 404));
        console.log(info);
        return res.status(200).json({
            message: "mail sent successfully",
            url,
        })
    })
}
