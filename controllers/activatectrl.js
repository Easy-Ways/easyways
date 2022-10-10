var url = require('url');
var urll="xx";
const user = require('../data-schema/user');
const msg = require('../data-schema/messages');
const messages = require('../data-schema/messages');
const sub = require('../data-schema/subscriptions');
const { get } = require('mongoose');
var ms,ys,ss;
var m = new Map()
exports.save = (req,res) =>{
    urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    id=q.id;
  	if(!id){
      		 return res.redirect('/login');}
    user.findOne({_id:id}).then((User)=>{
        if(!User){
           res.clearCookie('id',{path: '/'});
           return res.redirect('/login');
        }
        const msg = new messages({
            sid:User.id,
            name:User.Fullname,
        })
        msg.save().then(()=>{
           User.activation='1';
           
        //taking User subs 
        //startgetdata
     function getdata(){
        //Fetching all subs and arrying
        sub.find({section:User.section}).then((subs)=>{
            for(let i = 0; i < subs.length;i++){
                switch (subs[i].duration){
                    case "monthly":
                        ms=subs[i];
                    case "semester":
                        ss=subs[i];
                    case "yearly":
                        ys=subs[i];
                    default:
                        
                }
            } 
        })     
}
//end get data
//start create map
function organise_data(){ 
    
    
    //semesterly subs
    for(let i = 0; i<ss.subjects.length;i++){
            var mt=[]
        for(let j = 0;j<ms.subjects.length;j++){
            if(ms.class[j].search(ss.class[i])!=-1){
                mt.push(ms.subjects[j])
            }
        } 
        m.set(ss.subjects[i],mt);
    }
    //yearly subs
    for(let i = 0; i<ys.subjects.length;i++){
        var mt=[]
    for(let j = 0;j<ms.subjects.length;j++){
        if(ms.class[j].search(ys.class[i])!=-1){
            mt.push(ms.subjects[j])
        }
    } 
    m.set(ys.subjects[i],mt);
}
    
    }
    //end create map
    //begin clean
    function clean(){
    var subs = []
    for(let i = 0;i< User.subscription.length;i++){
        if(m.has(User.subscription[i])){
            const k = User.subscription[i];
            var a = []
            subs = a.concat(subs,m.get(k))
            
        }else{
            subs.push(User.subscription[i]);
        }
    }
    
    User.subscription=subs;
    User.save().then(()=>{
        res.redirect('https://easy-ways.tn')
    });
}
//end clean
    getdata()
    setTimeout(organise_data,3000) 
    setTimeout(clean,3100)
            })
        })
        
    }
   
      		
        
          
          
        
       
            
           
    