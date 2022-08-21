//1u78NxBzzqW7k9Xi
//z0KDiLVLWWxHVIMU

//req
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const Cour = require('./dataschema/cour');
const User = require('./dataschema/users');
const Notification = require('./dataschema/notification');
const ejs = require('ejs');
const Url = require('url');
const cour = require('./dataschema/cour');


//app creation
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(__dirname));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//connect MongoDB 
mongoose.connect('mongodb+srv://Easy:z0KDiLVLWWxHVIMU@dashboard.awhtori.mongodb.net/?retryWrites=true&w=majority') 
    .then(() => {
        console.log("connected");
    })
    .catch((error) => {
        console.log("connection lost");
        console.error(error);
    })

//Getting Data
app.use(bodyparser.json());


//rendering engine
app.engine('html', require('ejs').renderFile);

//setting view engine to html
app.set('view engine', 'html');

//setting views folder to local folder
app.set('views', __dirname);



//listen
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});

//done
//fct search
app.get('/search', (req,res,next) => {
  const cour = req.query.searchs;
  Cour.find({name: {$regex: new RegExp('^' + cour + '.*')} }).then(
        (cours) => {
            res.render('Courses.html',{
              courlist: cours
            });
        }
    ).catch((error) => {
        console.log(error);
      });
});


//Test
/*app.get('/Test',(req,res,next) => {
  const id = encodeURIComponent('124d59856d86');
  res.redirect('/index?id=' + id);
});*/

//Url to id
/*app.get('/index', (req,res,next) => {
  var url = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(url);
  var data = Url.parse(url,true);
  var q = data.query;
  var id = q.id;
  console.log(id);
})*/


/*app.get('/login',(req,res,next) => {
  const id = encodeURIComponent('62d087e9aa3d00dc23d9b06f');
  res.redirect('/index?id=' + id);
});*/



//done
//update reminder
app.post('/home', (req,res) => {
  User.findOne({_id: '62d087e1aa3d00dc23d9b06e'}, (err, Obj) => {
    if(err) {
      console.log(err);
    } else{
      if(!Obj){
        console.log('nexiste pas');
      }else{
        if(req.body.reminder1) {
          Obj.reminder1 = req.body.reminder1;
        }
        if(req.body.reminder2) {
          Obj.reminder2 = req.body.reminder2;
        }
        if(req.body.reminder3) {
          Obj.reminder2 = req.body.reminder3;
        }
        if(req.body.reminder4) {
          Obj.reminder2 = req.body.reminder4;
        }
      }
      Obj.save((err,upd) => {
        console.log('updated!');
        res.redirect('/home');
      });
    }
  });
});


//GET everything (ejs)
/*app.get('/home', (req,res,next) => {
  User.find({_id: '62d087e1aa3d00dc23d9b06e'}).then(
    (userr) => {
      Cour.find().then(
        (corps) => {
          console.log(userr[0].last_cour);
          console.log('cours: ', corps);
          for (let i = 0; i < corps.length; i++) {
            if(corps[i].test==1){
              userr[0].last_cour=corps[i].name;
              console.log(corps[i].name);
              console.log('user: ', userr[0].last_cour)
            }
        }
        userr[0].save();
        }
      ).catch((error) => {
        console.log(error);
      });
      Notification.find({_id: '62d1ead67e85f965a5e3d69a'}).then(
        (not) => {
          res.render('home.html', {
            studentuser: userr,
            noteuser: not,
          });
        }
      ).catch((error) => {
        console.log(error);
      });
    }
  ).catch((error) => {
    console.log(error);
  });
});*/

//get profile
//done
app.get('/Profile', (req,res,next) => {
  User.find({_id: '62d087e1aa3d00dc23d9b06e'}).then(
    (userr) => {
      res.render('Profile.html', {
        studentuser: userr
      });
    }
  ).catch((error) => {
    console.log(error);
  });
});

//update profile
//done
app.post('/Profile', (req,res) => {
  User.findOne({_id: '62d087e1aa3d00dc23d9b06e'}, (err, obb) => {
    if(err) {
      console.log(err);
    }else{
      if(!obb){
        console.log('nexiste pas');
      }else{
        if(req.body.email_adresse) {
          obb.email_adresse = req.body.email_adresse;
        }
        if(req.body.password) {
          obb.password = req.body.password;
        }
        if(req.body.mobile) {
          obb.mobile = req.body.mobile;
        }
      }
      obb.save(() => {
        console.log('data updated!');
        res.redirect('/Profile');
      });
    }
  });
});


// cours render
app.get('/Courses', (req,res,next) => {
  Cour.find().then(
    (cours) => {
      res.render('Courses.html', {
        courlist: cours
      });
    }
  ).catch((error) => {
    console.log(error);
  });
});


/*app.get(('/Resume'),(req,res,next) => {
  Cour.findOne({_id: '62e3b27194230f3b60beb2ef'}).then(
    (coor) => {
      coor.test=1;
      coor.save();
    }
  ).catch((error) => {
    console.log(error);
  });
});
*/

// change last cour
app.get(('/Resume'),(req,res,next) => {
  Cour.find().then(
    (coor) => {
      console.log(coor);
      for (let i = 0; i < coor.length; i++) {
        coor[i].test=0
        coor[i].save(() => {
          console.log('data saved: ', i);
        });
    }
    console.log('then');
    console.log(coor);
  }).catch((error) => {
    console.log(error);
  });
  Cour.findOne({_id: '62e649c904ba4e0f7b417446'}).then(
    (couur) => {
      console.log('after');
      couur.test=1;
      console.log(couur);
      couur.save(() => {
        console.log('data updated!');
      });
    }
  ).catch((error) => {
    console.log(error);
  });
});

//done
app.get('/home', (req,res,next) => {
  User.find({_id: '62d087e1aa3d00dc23d9b06e'}).then(
    (userr) => {
      Cour.find().then(
        (corps) => {
          console.log(userr[0].last_cour);
          console.log('cours: ', corps);
          let j;
          for (let i = 0; i < corps.length; i++) {
            if(corps[i].test==1){
              userr[0].last_cour=corps[i].name;
              console.log(corps[i].name);
              j= i;
              console.log('user: ', userr[0].last_cour)
            }
        }
        userr[0].save();
        Notification.find({_id: '62d1ead67e85f965a5e3d69a'}).then(
          (not) => {
            Cour.find({name: corps[j].name}).then(
              (couur) => {
                console.log('u can do this!');
                console.log(couur);
                res.render('home.html', {
                  studentuser: userr,
                  noteuser: not,
                  coursesuser: couur,
                });
              }
            )
          }
        ).catch((error) => {
          console.log(error);
        });
        }
      ).catch((error) => {
        console.log(error);
      });
    }
  ).catch((error) => {
    console.log(error);
  });
});

// course progress
app.post('/fin', (req,res) => {
  User.findOne({_id: '62d087e1aa3d00dc23d9b06e'}, (err, Obg) => {
    if(err) {
      console.log(err);
    } else{
      if(!Obg){
        console.log('nexiste pas');
      }else{
        if(Obg.cour_progress <= 100){
          Obg.cour_progress+=5;
        }
      }
      Obg.save((err,upd) => {
        console.log('updated!');
        console.log('cour progress: ' ,Obg.cour_progress ,'%');
        res.redirect('/Courses');
      });
    }
  });
});