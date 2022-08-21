const cookieparser = require('cookie-parser');
const User = require('../data-schema/user');
const Cour = require ('../data-schema/courses') ;
const Note = require('../data-schema/note');
const Contact = require('../../data-schema/contact');

exports.rendere = (req,res,next) => {
  var id = req.cookies.id;
  if(id=='010101'){
    Contact.find().then(
      (contacts) => {
        User.find({type: 'Student', paymentac:'1'}).then(
          (users) => {
            User.find({type: 'Teacher'}).then(
              (profs) => {
                Cour.find().then(
                  (cours) => {
                    User.find({type: 'Student', paymentac:'0'}).then(
                      (userr) => {
                        res.render('home-admin.html', {
                          contactlist: contacts,
                          studentuser: users,
                          teacherlist: profs,
                          courlist: cours,
                          studentlist: userr,
                        })
                      }
                    )
                  }
                )
              }
            )
          }
        )
      }
    )
  }
}

exports.note = (req,res) => {
  const note = new Note({
      message: req.body.message,
      name: req.body.name,
      department: req.body.department,
      subject: req.body.subject,
 })
 
 note.save()
     .then(() => {
        res.redirect('/home')
     })
     .catch((error) => {
         console.error(error);
     })
};