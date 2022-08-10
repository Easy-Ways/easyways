const sub = require('../data-schema/subscriptions');
exports.rendere = (req,res,next)=>{
    res.render('subuploader.html',{
        message:''
    });
    
   };
exports.save = (req,res,next)=>{
    sub.findOne({section: req.body.section,duration:req.body.duration})
    .then((Sub)=>{
        if(Sub){
            let i=0;
            
            while(Sub.subjects[i]!=req.body.subject && i< Sub.subjects.length){
                i++;
            }
            if(i==0){
                Sub.subjects[i]=req.body.subject;
                Sub.prices[i]=req.body.price;  
            }
            else if(Sub.subjects[i]==req.body.subject){
                Sub.prices[i]=req.body.price;
            }else{
                if(Sub.subjects[i]){
                Sub.subjects[i+1]=req.body.subject;
                Sub.prices[i+1]=req.body.price;
                }
                Sub.subjects[i]=req.body.subject;
                Sub.prices[i]=req.body.price;
            }
        Sub.save().then(()=>{
            res.render('subuploader.html',{
                message:'Subscription updated !'
            });
        })
        }else{
            const Subb = new sub({
                section: req.body.section,
                duration: req.body.duration,
            })
            
            Subb.save().then(()=>{
                res.render('subuploader.html',{
                    message:'Subscription created newly, please fill again!'
                })
            })
        }
        
    }).catch((err)=>{
        console.error(err)
    })
   };