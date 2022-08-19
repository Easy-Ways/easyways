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
    Contact.findById(cid).then((contact)=>{
      let transporter = nodemailer.createTransport({
        host:'mail.easy-ways.tn',
        port: 587,
        auth: {
          user:'support@easy-ways.tn',
          pass:'01-Easyways-01',
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
  
      });
        
  let info = ({
      from: ' support@easy-ways.tn', // sender address
      to: contact.email, // list of receivers
      subject: contact.subject, // Subject line
      text: req.body.message, // plain text body
       // plain text body
    });
    transporter.sendMail(info,()=>{
      Contact.findByIdAndDelete(cid).then(()=>{
        res.render('contacts.html',{
          contactlist: cont,
          message:'Message Sent !',
      })
      })
      
    })
      
    })
    
}