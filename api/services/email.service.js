require("dotenv").config();

const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const moment = require("moment");

let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST, // berisi SMTP (Simple Mail Transfer Protocol)
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendEmailOnCreateUser = async function (users) {
  var mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: users.email, // mengirimkan email notifikasi ke email yg baru diregisterkan
    subject: "Pesan dari Praktikum BackEnd",
    html: `<h4><b>Selamat Akun anda telah terdaftar di sistem kami!</b></h4>
    <ul>
        <li>Nama: ${users.nama}</li>
        <li>Username: ${users.username}</li>
        <li>Telp: ${users.telp}</li>
    <li>Email: ${users.email}</li>
    </ul>
`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return { success: false, msg: "gagal kirim email" };
    } else {
      console.log("Email sent: " + info.response);
      return { success: true, msg: "berhasil kirim email" };
    }
  });
};

exports.sendEmailOnCreateUserWithTemplate = async function (users) {
  var fileHtml = fs.readFileSync(
    "views/templates/template-email-verifikasi.html",
    "utf8"
  );
  var template = handlebars.compile(fileHtml);
  const tanggal_v1 = moment(new Date()).format("YYYY-MM-DD HH:mm");
  var replacements = {
    tanggal: tanggal_v1,
    name: users.nama,
    pesan: "Selamat akun anda telah terdaftar di sistem kami.",
    username: users.username,
    telpon: users.telp,
    email: users.email,
  };
  var htmlnya = template(replacements);
  const subjectnya = "Verifikasi Akun email";
  var mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: users.email, // mengirimkan email notifikasi ke email yg baru diregisterkan
    subject: subjectnya,
    html: htmlnya,
    attachments: [
      {
        filename: "shield.png",
        path: __dirname + "../../../public/assets/shield.png",
      },
    ],
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return { success: false, msg: "gagal kirim email" };
    } else {
      console.log("Email sent: " + info.response);
      return { success: true, msg: "berhasil kirim email" };
    }
  });
};
