const nav_bar = document.querySelector('.nav-bar');

// CREATING NAVBAR ELEMENTS
const logo_img = document.createElement('img');
const search_div = document.createElement('div');
const search_logo_img = document.createElement('img');
const search_input = document.createElement('input');
const header_links_div = document.createElement('div');
const login_btn = document.createElement('button');
const sign_up = document.createElement('button');
const burger_img = document.createElement('img');

// GIVING NAVBAR ELEMENTS CLASSES
logo_img.classList.add('logo') 
search_div.classList.add('search') 
search_logo_img.classList.add('search-icon') 
search_input.classList.add('search-input')
header_links_div.classList.add('header-links') 
login_btn.classList.add('log-out') 
sign_up.classList.add('log-out') 
burger_img.classList.add('menu') 