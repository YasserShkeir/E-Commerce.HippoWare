const nav_bar = document.querySelector('.nav-bar');

// CREATING NAVBAR ELEMENTS
const logo_img = document.createElement('img');
const search_div = document.createElement('div');
const search_icon_img = document.createElement('img');
const search_input = document.createElement('input');
const header_links_div = document.createElement('div');
const login_btn = document.createElement('button');
const signup_btn = document.createElement('button');
const burger_img = document.createElement('img');

// GIVING NAVBAR ELEMENTS CLASSES
logo_img.classList.add('logo'); 
search_div.classList.add('search'); 
search_icon_img.classList.add('search-icon'); 
search_input.classList.add('search-input');
header_links_div.classList.add('header-links'); 
login_btn.classList.add('log-out'); 
signup_btn.classList.add('log-out'); 
burger_img.classList.add('menu');

// INSERTING VALUES TO ELEMENTS 
logo_img.src = '../../assets/logo.png';
search_icon_img.src = '../../assets/search-icon.png';
search_input.placeholder = 'search';
login_btn.innerText = 'Log in';
signup_btn.innerText = 'Sign up';
burger_img.src = '../../assets/menu.png';