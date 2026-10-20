 import nodemailer from "nodemailer"


 export const Subjects = {
     Register:"Active your account",
     resetpPassword:"Reset Your password"
 }


 export const SendEmail= async({to,subject,text,html})=>{
     // Setup  Configration of sending email //
     const transporter = nodemailer.createTransport({
         host:"smtp.gmail.com",
         port:465,
         secure:true,
         auth:{
             user:"mh3386233@gmail.com",
             pass:"fddt ynrr ltat mcxe"
         }
     })   

     /// Body or real email ///
     const info = await transporter.sendMail({
         from:"mh3386233@gmail.com",
         to,
         subject,
         text,
         html
        
     })

     console.log(info);
    
 }


