const nodemailer = require('nodemailer');

exports.contacter = async(req,res)=>{
const {nom, email, subject, message} = req.body;
console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez le service Gmail ou configurez un autre service SMTP
    auth: {
      user: 'roudanannie@gmail.com', // Votre adresse e-mail Gmail
      pass: 'lrzpzjwmlvahucxf', // Votre mot de passe Gmail
    },
  });
  
  
    const mailOptions = {
      from:req.body.email,
      to: ["isdsetuniversity@gmail.com" , "roudanannie@gmail.com"],
      subject: ` Message from ${email}: ${subject}`,
      text: message,
      replyTo: email
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, (erreur, info) => {
      if (erreur) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', erreur);
      } else {
        res.json({reponse: info.response});
      }
    });
  
}


