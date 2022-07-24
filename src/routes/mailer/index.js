const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/send-email", (req, res) => {
    //console.log("<h1>Sended Email  </h1>")
    //res.send("<h1>Sended Email  </h1>")
    const { email, name, lastname,subject,text,html } = req.body;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",//"smtp.ethereal.email",
        port: 465,//puerto de gmail safe
        secure: true,
        auth: {
            user: 'vlixes.international@gmail.com',//'emily.bailey89@ethereal.email',
            pass: 'vgdeuabjocmsvsjr', //'aPXw54KrJAP1nVSpz1'
        }
    });
    let  mailOptions = {
        from:`" Dear ${name} ${lastname} from VLIXES Your sport Shop 🏆" `,
        to : email,
        subject :subject,
        text : text,
        html:html

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
  // verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
})

module.exports = { mailer: router };