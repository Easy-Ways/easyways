const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const signin = require('./routers/signin');
const home = require('./routers/home');
const uploader = require('./routers/upload');
const sch_up = require('./routers/sch-up');
const sub_up = require('./routers/sub-up');
const course = require('./routers/allcourses');
const logout = require('./routers/logout');
const cookieParser = require('cookie-parser');
const addprof = require('./routers/addprof');
//prereq
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//dont fucking touch me //dont fucking touch me //dont fucking touch me 
app.set('views',[__dirname ,__dirname + '/student',__dirname + '/admin-area']);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname));                 //dont fucking touch me 
app.use(express.static(__dirname+ '/student'));      //dont fucking touch me 
app.use(express.static(__dirname+'./student/css'));  //dont fucking touch me 
app.use(express.static(__dirname+'./assets/css/'));   
app.use('/admin',express.static(__dirname+ '/admin-area'));
app.use('/admin',express.static(__dirname+'./admin-area/css/'));
//dont fucking touch me 
//dont fucking touch me //dont fucking touch me //dont fucking touch me 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
//mongoconnect
mongoose.connect('mongodb+srv://testing:testingattentionplz@cluster0.p8qqu3t.mongodb.net/?retryWrites=true&w=majority')
  .then(()=>{
    console.log("DB Connected");
  })
  .catch((error)=>{
    console.error(error);
  })

//getting data
app.use(bodyparser.json());
app.use(cookieParser());
//renders
app.use('/add-prof',addprof);
app.use('/all-courses',course);
app.use('/login',signin).listen(3000);
app.use('/home',home);
app.use('/sch-up',sch_up);
app.use('/sub-up',sub_up);
app.use('/uploader',uploader);
app.use('/logout',logout);

