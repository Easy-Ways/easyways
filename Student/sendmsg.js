const form = document.getElementById("form");
const msginput = document.getElementById("msg-Input");
const secinput = document.getElementById("sec-Input");

form.addEventListener("submit",e=>{
    e.preventDefault();
    const msg = msginput.value;
    console.log(msg);
    if(msg===""){
      return
    }
    displaymsg(msg);
    msginput.value= ""
}) 

function displaymsg(message){
    const p = document.createElement("div");
    p.textContent="You: " + message;
    document.getElementById("reciever").append(p);
}