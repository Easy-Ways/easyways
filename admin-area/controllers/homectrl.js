const cookieparser = require('cookie-parser');
exports.rendere = (req,res,next)=>{ 
      var id =req.cookies.id;
        if(id=='010101'){
        res.render('home-admin.html');    
     }
    }
