const Cour = require('../data-schema/courses');
const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
const { save } = require('./sectionctrl');
var id;
exports.rendere = (req,res) => {
    id=req.cookies.id;
    if(!id){
        return res.redirect('/login');
    }
    user.findOne({_id: id}, (err, Obg) => {
        if(err) {
        console.log(err);
        } else{
            if(!Obg){
                console.log('nexiste pas');
            }else{
                Cour.findOne({name: Obg.last_cour}).then(
                    (cor) => {
                        if(Obg.cour_progress <= 100){
                            let test= true;
                            for( let i=0; i < Obg.finished_cours.length; i++) {
                                if(Obg.finished_cours[i]==cor.name){
                                    test=false;
                                }
                            }
                            if(test==true){
                                Obg.cour_progress+=2;
                                Obg.finished_cours[Obg.finished_cours.length]=cor.name;
                            }
                            }
                        Obg.save((err,upd) => {
                            console.log('updated!');
                            var string = encodeURIComponent(cor.subject);
                            res.redirect('/Courses?m=' + string);
                        });    
                    }
                )
            }
        }
    });
}