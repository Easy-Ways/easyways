const Course = require('../data-schema/courses');
const cookieParser = require('cookie-parser');
var id;
var url = require('url');
var urll="xx";

exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    if(id!='010101'){
        return res.redirect('/login');
    }
    Course.find().then((Courses)=>{
        res.render('all-courses.html',{
            courlist:Courses,
        })
    })
    
  }