import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     host: process.env,
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.EMAIL_USER, // generated ethereal user
//       pass:process.env.EMAIL_PASS, // generated ethereal password
//     },
// });
  


const send = async infoObj => {

  try {
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass:process.env.EMAIL_PASS, // generated ethereal password
      },
  });
    
  let info = await transporter.sendMail(infoObj);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


  } catch (error) {
    console.log(error)
  }




}


export const emailProcessor = ({ fname, email, pin }) => {
  const link = `http://localhost:3000/email-verification?pin=${pin}&email=${email}`
  let info = {
    from: `"E-shop 👻" <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Email Cconfirmation required", // Subject line
    text: `Hi ${fname} please follow the link below to confirm your email. ${link}`, // plain text body
    html: `
    Hello there,
    <br/>

    Please follow the link below to confirm your email. <br/><br/>
    ${link}
    <br/><br/>

    Thank you<br/><br/>
    ------some company information---
    
    
    
    `, // html body
  }

  send(info);
  };
