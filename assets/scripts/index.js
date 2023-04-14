'use strict';
//// getting fakes contacts

// preloading fake data
const url = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
};

async function getContacts() {

    try {
        const response = await fetch(url, options);

        const contactsContainer = document.querySelector('.contacts-container');

        if(!response.ok) {
           throw new Error(`${response.statusText}: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); 
        //console.log(data.results[0].name.first);
        //console.log(data.results[0].name.last);
        //console.log(data.results[0].email);
        console.log(data.results[0].picture.thumbnail);

        data.results.forEach((element) => {
            console.log('' + element.name.first + ' ' + element.name.last + ', ' + element.location.city + ', ' + element.email + '');
            const contactContent = document.createElement('div');
            contactContent.classList.add('contact-content');
            contactsContainer.appendChild(contactContent);     
            contactContent.innerHTML = `
            <div class="row">
                <div class="contact-image">
                    <img src="${element.picture.thumbnail}" height=47 alt="user-icon">
                </div>
                <div class="contact-data">
                    <div class="contact-name">
                        ${element.name.first} <span> </span> ${element.name.last}
                    </div>
                    <div class="contact-city">
                        ${element.location.city}
                    </div>
                </div>
            </div>
            <div class="contact-more">
                <i class="fa fa-plus-circle"></i>
            </div>`;
       
        });

    //        listContacts();
    } catch(error) {
        console.log(error.message);
    }
}

getContacts();



/////// account info
class User {
    #id;
    #name;
    #userName;
    #email;

    constructor(id, name, userName, email){
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    get id() { return this.#id; }
    get name() {return this.#name; }
    get userName() {return this.#userName; }
    get email() { return this.#email; }

    getInfo() {
        return `${this.#id}, ${this.#name}, ${this.#userName}, ${this.#email}`;
    }
}

class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email);
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    get pages() { return this.#pages; }
    get groups() { return this.#groups; }
    get canMonetize() { return this.#canMonetize; }

    getInfo() {
        return `${this.name}, ${this.userName}, ${this.email}, ${this.#pages}, ${this.#groups}, ${this.#canMonetize}`;
    }
}


// Display user info

const userIcon = document.querySelector('.user-avatar');
const displayUserInfo = document.querySelector('.display-user-info');
const userInfo = document.querySelector('.user-account-info');
const pagesArray = ['Winnipeg Association', 'Community Church', 'Atholone Ecole', 'Mitt'];
const groupsArray = ['Group 1', 'Group 2', 'Group 3'];
let newUserName = '';

function showInfo(newArray) {

    const container = document.createElement('div');
    container.classList.add('user-data');
    const h4 = document.createElement('h4');
    h4.innerHTML = 'User account';
    container.appendChild(h4);
    const ul = document.createElement('ul');
    container.appendChild(ul);

    newArray.forEach((element) => {
        const li = document.createElement('li');
        li.innerHTML = `${element}`;
        ul.appendChild(li);
    });
    //console.log(container);
    userInfo.append(container);
}

try {
    const newSubscriber = new Subscriber('1010', 'Laura Tejada', 'laura', 'laura@email.com', pagesArray, groupsArray, true);
    //console.log(newSubscriber.getInfo());
    const newInfo = newSubscriber.getInfo().split(', ');
    newUserName = newInfo[0];
    //console.log(newInfo);
    showInfo(newInfo);
} catch (error) {
    console.log(error.message);
}

userIcon.addEventListener('click', () => {
    displayUserInfo.classList.toggle('show');
    if (displayUserInfo.classList.toggle('show')) {
        displayUserInfo.classList.remove('show');
        displayUserInfo.classList.add('not-show');
        displayUserInfo.classList.remove('show-user-info');
    }  else {
        displayUserInfo.classList.add('show');
        displayUserInfo.classList.remove('not-show');
        displayUserInfo.classList.add('show-user-info');
    } 
});

// Read file and add post

const posts = document.querySelector('.posts');
const btnPost = document.querySelector('.button');
const fileInput = document.querySelector('input[type="file"]');
const postText = document.querySelector('.post-text');
const reader = new FileReader();

function addPost() {
    //console.log(`${newUserName}`);
    if(postText.value !== ''){
        console.log(postText.value);
        const today = new Date();
        const date = today.toDateString().slice(4);
        const post = document.createElement('div');
        post.classList.add('post');
        post.innerHTML = `
            <div class="post-header flex">
                <div class="flex">
                    <img src="assets/images/user-icon.png" width="47" alt="user-icon">
                    <h4>${newUserName}</h4>
                </div>
                <div>
                    <p>${date}</p>
                </div>
            </div>
            <div class="post-content">
                <div class="post-content-text">
                    <p>${postText.value}</p>
                </div>
                <div class="post-content-image">
                    <img class="preview" src="" width="100%" >
                </div>
            </div>`;
        posts.prepend(post);
    }
}

function handleEvent(event) {
   const preview = document.querySelector("img.preview"); 
   if (event.type === "load") {
    preview.src = reader.result;
  }
}

function addListeners(reader) {
  reader.addEventListener("loadstart", handleEvent);
  reader.addEventListener("load", handleEvent);
  reader.addEventListener("loadend", handleEvent);
  reader.addEventListener("progress", handleEvent);
  reader.addEventListener("error", handleEvent);
  reader.addEventListener("abort", handleEvent);
}

function handleSelected(e) {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    addListeners(reader);
    reader.readAsDataURL(selectedFile);
   // console.log(reader)
  }
}

console.log(fileInput);

btnPost.addEventListener('click', (e) => {
    addPost();
    handleSelected(e);
    fileInput.value = '';
    postText.value = '';
});

// Responsive Menu

const navButtonB = document.querySelector('.navbar .fa-bars');
const navButtonX = document.querySelector('.navbar .fa-x');
const navMenu = document.querySelector('nav ul');
const nav = document.querySelector('.nav');

navButtonB.addEventListener('click', () => {
        nav.classList.add('show-nav');
        navMenu.classList.add('show');
        navMenu.classList.add('show-menu-responsive');
        navButtonB.classList.add('not-show');
        navButtonX.classList.remove('not-show');
});

navButtonX.addEventListener('click', () => {
   // console.log(navMenu.className);
    if (navMenu.className = 'show') {
        nav.classList.remove('show-nav');
        navMenu.classList.remove('show');
        navMenu.classList.remove('show-menu-responsive');
        navButtonB.classList.remove('not-show');
        navButtonX.classList.add('not-show');
    }
});

navMenu.addEventListener('click', () => {
    if (navMenu.className = 'show') {
        nav.classList.remove('show-nav');
        navMenu.classList.remove('show');
        navButtonB.classList.remove('not-show');
        navButtonX.classList.add('not-show');
    }
});