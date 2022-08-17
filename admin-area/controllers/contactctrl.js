const Contact = require('../../data-schema/contact');
const cookieParser = require('cookie-parser');
var id;
var url = require('url');
var urll="xx";

exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    if(id!='010101'){
        return res.redirect('/login');
    }
    Contact.find().then((cnct)=>{
        res.render('contacts.html',{
            contactlist: cnct,
        })
    })
    
  }