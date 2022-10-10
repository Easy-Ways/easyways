//packages
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const search = require('./routers/search');
const msearch = require('./routers/msearch');
const esearch = require('./routers/esearch');
const dsearch = require('./routers/dsearch');
const signup = require('./routers/singup');
const section = require('./routers/section')
const signin = require('./routers/signin');
const home = require('./routers/home');
const events = require('./routers/events');
const pricing = require('./routers/pricing');
const guide = require('./routers/guide');
const contact = require('./routers/contact');
const aboutus = require('./routers/about-us');
const subscription = require('./routers/subscription');
const profile = require('./routers/profile');
const cookieParser = require('cookie-parser')
const course = require('./routers/course');
const courlock = require('./routers/courlock');
const cour_progress = require('./routers/cour_progress');
const activate = require('./routers/activate');
const schedule = require('./routers/schedule');
const fpass = require('./routers/fpass');
const reset = require('./routers/reset');
const payment = require('./routers/payment');
const paymethod = require('./routers/paymethod');
const bank = require('./routers/bank');
const d17 = require('./routers/d17')
const exercice = require('./routers/exercice');
const method = require('./routers/method');
const devoir = require('./routers/devoir');
const mailbox = require('./routers/mailbox');
const forum = require('./routers/forum');
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
mongoose.connect('mongodb+srv://Easy:z0KDiLVLWWxHVIMU@dashboard.awhtori.mongodb.net/?retryWrites=true&w=majority') 
  .then(()=>{
    console.log("DB Connected");
  })
  .catch((error)=>{
    console.error(error);
  })
  //cookies
  app.use(cookieParser())
//getting data
app.use(bodyparser.json());
//html render
//landboard views
//securing resources
app.get('*()/*().*()',(req,res)=>{
    res.render('404.html');
})

app.use('/events',events);
app.use('/pricing',pricing);
app.use('/guide',guide);
app.use('/contact',contact);
app.use('/about-us',aboutus);
app.use('/register', signup);
app.use('/', section);
app.use('/subscription',subscription);
app.use('/login',signin);
app.use('/activate-acc',activate);
app.use('/forgetpass',fpass).listen(4000);
app.use('/resetpass',reset);
app.use('/payment',payment);
app.use('/pay',paymethod);
app.use('/bank',bank);
app.use('/d17',d17);
//student-dashboard
app.use('/home',home);
app.use('/search', search);
app.use('/msearch', msearch);
app.use('/esearch', esearch);
app.use('/dsearch', dsearch);
app.use('/Profile',profile);
app.use('/Courses', course);
app.use('/OurCour',courlock);
app.use('/Progress', cour_progress);
app.use('/Schedule',schedule);
app.use('/Exercices',exercice);
app.use('/Methods',method);
app.use('/Devoirs',devoir);
app.use('/mailbox',mailbox);
app.use('/forum',forum);


