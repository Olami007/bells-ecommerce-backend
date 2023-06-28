var nodemailer = require("nodemailer");

exports.Mail = (to, subject, body, callback) => {
  var transporter = nodemailer.createTransport({
    // service: "gmail",
    // auth: {
    //   user: "oladimejibells@gmail.com",
    //   pass: "pwvixbuejeyqoffc",
    // },
    service: "hotmail",
    auth: {
      user: process.env.HOTMAIL_ADDRESS,
      pass: process.env.HOTMAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.HOTMAIL_ADDRESS,
    to: to,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      console.log("Email sent: " + info.response);
      let response = "Email sent successfully";
      callback(response);
    }
  });
};
