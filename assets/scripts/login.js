'use strict';

localStorage.setItem('username', 'lauratejada');
localStorage.setItem('password', '123456');

const btnLogin = document.querySelector('#btn-login');

//console.log(document.location);
//console.log(document.location.origin);
//console.log(document.location.pathname);
//const urlLogin = document.location.href + 'home.html';
//checking
function validateLogin(){
    const storedName = localStorage.getItem('username');
    const storedPass = localStorage.getItem('password');
    console.log(storedName);
    console.log(storedPass);

    const userName = document.querySelector('#userName');
    const userPass = document.querySelector('#userPassword');
    const message = document.querySelector('.message-invalid p');

    //console.log(userName.value);
    //console.log(userPass.value);

    if((userName.value == storedName) && (userPass.value == storedPass)){
        console.log('You are logged in.');

       //window.location.assign(urlLogin);
        window.location.href = 'home.html';
    }else{
        console.log('Error on login');
        message.style.color = 'red';
    }
}

btnLogin.addEventListener('click', validateLogin); 
