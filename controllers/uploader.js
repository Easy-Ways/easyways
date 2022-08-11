const Course = require('../data-schema/courses');
exports.rendere = (req,res,next)=>{
    res.render('courseuploader.html',{
        message:'',
    });
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
            pdf: req.body.pdf,
    });
    course.save()
    .then(()=>{
        res.render('courseuploader.html',{
            message:'Course Uploaded!',
        });
        console.log("done");
    })
    .catch((error)=>{
        console.error(error);
    })
   };