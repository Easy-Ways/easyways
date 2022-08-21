const Note = require('../data-schema/note');
const cookieParser = require('cookie-parser');
var id;
exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    if(id!='010101'){
        return res.redirect('/login');
    }
    Note.find().then((notes)=>{
        res.render('notes.html',{
            notelist: notes,
        })
    }
  )
}