const Contact = require('../../data-schema/contact');
const cookieParser = require('cookie-parser');
var id;
var url = require('url');
var urll="xx";
const nodemailer = require('nodemailer');
var cont;
exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    if(id!='010101'){
        return res.redirect('/login');
    }
    Contact.find().then((cnct)=>{
        cont = cnct;
        res.render('contacts.html',{
            contactlist: cnct,
            message:'',
        })
    })
    
  }
exports.save =(req,res) =>{
    var cid = req.body.id;
  /*  nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "username",
          pass: "password",
        },
      });
      
let info = ({
    from: ' academy.easyways@gmail.com', // sender address
    to: User.email, // list of receivers
    subject: "Hello ✔ Reset your password", // Subject line
    text: "", // plain text body
    html: data, // plain text body
  });
  transporter.sendMail(info,()=>{
              
    res.render('forgetpass.html',{
      message:'Please Check your mail'
    });
  })*/
    Contact.findOneAndDelete({_id:cid}).then(()=>{
        res.render('contacts.html',{
            contactlist: cont,
            message:'Message Sent !',
        })
    })
}