const contact = require('../data-schema/contact')
exports.rendere = (req,res,next)=>{
    res.render('contact.html',{
        message: ' '
    });
 };
 exports.contact = (req,res,next) => {
    const Contact = new contact({
        message: req.body.message,
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
   })
   
   Contact.save()
       .then(() => {
          res.render('contact.html',{
            message: "We recieved your message Successfuly! We will reach you ASAP!"
          })
       })
       .catch((error) => {
           console.error(error);
       })
};