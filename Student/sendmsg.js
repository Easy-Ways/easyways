const form = document.getElementById("textform");
const form2 = document.getElementById("secform");
const msginput = document.getElementById("msg-Input");
const secinput = document.getElementById("sec-Input");
const sid = document.getElementById("sid");
const sb = document.getElementById("sb");
const ob = document.getElementById("ob");
const obli = document.getElementById("obli");
const sbli = document.getElementById("sbli");

ob.addEventListener("click",e=>{
obli.classList.add("active");
sbli.classList.remove("active");
document.getElementById("sendmsg").style.display="none";
document.getElementById("oldmsgs").style.display="block";

})
sb.addEventListener("click",e=>{
sbli.classList.add("active");
obli.classList.remove("active");
document.getElementById("sendmsg").style.display="block";
document.getElementById("oldmsgs").style.display="none";

})
form.addEventListener("submit",e=>{
    e.preventDefault();
    const msg = msginput.value;
    if(msg===""){
      return
    }
    displaymsg(msg);
    msginput.value= ""

}) 
form2.addEventListener("submit",e=>{
    e.preventDefault();
    const room = secinput.value;
    if(room===""){
      return
    }
    console.log(sid.value)
    displayroom(room);
    msginput.value= ""
    
}) 

function displaymsg(message){
    const p = document.createElement("div");
    p.textContent="You: " + message;
    document.getElementById("reciever").append(p);
}
function displayroom(message){
    $("#room").html('Connected to : '+ message);
}
