const course = require('../data-schema/courses');
exports.rendere = (req,res,next)=>{
    res.render('uploader.html');
   };
exports.upload = (req,res,next)=>{
      
    const course = new Course ({
            name : req.body.name,
            hours : req.body.hours,
            diff : req.body.diff,
            image : req.body.image,
            teacher : req.body.teacher,
            section : req.body.school,
            subject : req.body.subject,
    });
    course.save()
    .then(()=>{
        console.log("done");
    })
    .catch((error)=>{
        console.error(error);
    })
   };