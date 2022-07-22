const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/send-email", (req, res) => {
    //console.log("<h1>Sended Email  </h1>")
    //res.send("<h1>Sended Email  </h1>")
    const { email, name, lastname,subject,text } = req.body;
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'emily.bailey89@ethereal.email',
            pass: 'aPXw54KrJAP1nVSpz1'
        }
    });
    let  mailOptions = {
        from: `" VLIXES Your sport Shop👻" to ${name} ${lastname} <${email}>`,
        to : email,
        subject : subject,
        text : text

    }
   transporter.sendMail( mailOptions,(err, data) => {
        if (err) {
            res.status(500).send(err.message);    
        }
        else {
            console.log('Email sent');
            res.status(200).json(req.body);
        }
    })
})

module.exports = { mailer: router };