const Notif = require('../../data-schema/notification');
exports.rendere = (req,res,next)=>{
    res.render('notuploader.html',{
        message:'',
    });
   };
exports.upload = (req,res,next)=>{ 
    const notif = new Notif ({
            title : req.body.title,
            time : req.body.time,
            message : req.body.message,
            class : req.body.class,
            subject : req.body.subject,
    });
    notif.save()
    .then(()=>{
        res.render('notuploader.html',{
            message:'Notification Uploaded!',
        });
        console.log("done");
    })
    .catch((error)=>{
        console.error(error);
    })
   };