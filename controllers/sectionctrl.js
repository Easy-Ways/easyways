const user = require('../data-schema/user');
var url = require('url');
var urll="xx";
exports.F = (req,res,next)=>{
  urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    id=q.id;
    user.findById(id).then((User)=>{
      if(!User){
        return res.redirect('/login');
      }
    })
    res.render('sectionfac.html');
};
exports.l = (req,res,next)=>{
    urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    id=q.id;
    if(!id){
      res.redirect('/login');
    }
    res.render('sectionlycee.html');  
};
    
exports.save = (req,res,next)=>{
    var data = url.parse(urll,true);
    var q= data.query;
    var id = q.id;
    user.findOne({_id: id}, (err, obb) => {
        if(err) {
          console.log(err);
        } else{
          if(!obb){
          }else{
            
            if(req.body.section) {
              obb.section = req.body.section;
            }
          }
          obb.save(() => {
            res.redirect('/subscription?id=' + id);
          });
        }
      });
    
};
