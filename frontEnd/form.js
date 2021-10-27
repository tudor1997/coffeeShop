const fullName = document.querySelector(".name");
const email = document.querySelector(".email");
const message = document.querySelector(".message");
const form = document.querySelector("form");
const success = document.querySelector(".success");

const messageAPI = "http://127.0.0.1:8000/message/";

  
form.addEventListener('submit', (e) =>{
    const data = {
        name: fullName.value,
        email: email.value,
        message: message.value
    }
    e.preventDefault();
fetch(messageAPI, {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(data)

}).then(res =>{
    success.classList.add('active');
    setInterval(()=>{
        success.classList.remove('active');
        form.reset();
    },3000);
   return res.json();
}).then(response => console.log(response));

});

