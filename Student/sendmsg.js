const form = document.getElementById("textform");
const form2 = document.getElementById("secform");
const msginput = document.getElementById("msg-Input");
const secinput = document.getElementById("sec-Input");
const sid = document.getElementById("sid");
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
