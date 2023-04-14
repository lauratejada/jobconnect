'use strict';

localStorage.setItem('username', 'lauratejada');
localStorage.setItem('password', '123456');

const btnLogin = document.querySelector('#btn-login');

console.log(document.location);
console.log(document.location.origin);
console.log(document.location.pathname);
const urlLogin = document.location.href + 'home.html';
//checking
function check(){
    const storedName = localStorage.getItem('username');
    const storedPass = localStorage.getItem('password');

    const userName = document.querySelector('#userName');
    const userPass = document.querySelector('#userPassword');
    const message = document.querySelector('.message-invalid');

    if(userName.value == storedName && userPass.value == storedPass){
        console.log('You are logged in.');

       window.location.assign(urlLogin);
    }else{
        console.log('Error on login');
        message.style.display = 'block';
    }
}

btnLogin.addEventListener('click', check); 
