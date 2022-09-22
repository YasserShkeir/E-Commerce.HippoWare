const nav_bar = document.querySelector('.nav-bar');
const signup_form_container = document.querySelector('.signup-form-container');
const signin_form_container = document.querySelector('.signin-form-container');
const signup_close_btn = document.querySelector('.signup_close_btn');
const login= document.getElementById('login');
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

// APPENDING ELEMENTS IN THEIR RESPECTIVE CONTAINER
nav_bar.append(logo_img, search_div, header_links_div);
search_div.append(search_icon_img, search_input);
header_links_div.append(signup_btn, login_btn);


const firstName=document.getElementById('fname')
const lastName=document.getElementById('lname')
const userName=document.getElementById('username')
const email=document.getElementById('email')
const password=document.getElementById('password')
const confirmPassword=document.getElementById('password-confirm')
const sellerSignup=document.getElementById('seller-signup')
const clientSignup=document.getElementById('client-signup')
const emailSignin=document.getElementById('email-signin')
const passwordSignin=document.getElementById('password-signin')
const loginButtonForm=document.getElementById('login')

function passwordFormat(password){
    const expression=/^[0-9a-zA-Z]{8,}$/
    return (expression.test(password))
}

// SIGN UP POPUP
signup_btn.addEventListener('click', ()=>{
    signup_form_container.style.display = 'block';
})
sellerSignup.addEventListener('click', (event)=>{
    document.getElementById('not-matching').style.display='none'
    document.getElementById('wrong-format').style.display='none'
    document.getElementById('register-success').style.display='none'
    event.preventDefault()
    if (firstName.value && lastName.value && userName.value && email.value && password.value && confirmPassword.value)
    {
        if(password.value==confirmPassword.value){
            if(passwordFormat(password.value)){
                register()
            }
            else{
                document.getElementById('wrong-format').style.display='block'
            }
        }
        else{
            document.getElementById('not-matching').style.display='block'
        }
    }
})

//function to register the user
function register(){
    let payload = {first_name: firstName.value, last_name: lastName.value, username: userName.value, email: email.value, image: null, password: password.value, user_type_id: 2}
    let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/registration.php',payload).then(
        function (response) {
        console.log(response.data);
        // I need this data here ^^
        document.getElementById('register-success').style.display='block'
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
}

document.getElementById("signup_close_btn").onclick=()=>{
    signup_form_container.style.display = 'none';
}


//logging in
login_btn.onclick=()=>{
    signin_form_container.style.display = 'block';
}
loginButtonForm.addEventListener('click', (event)=>{
    event.preventDefault()
    if (emailSignin.value && passwordSignin.value){
        signIn()
    }
})
 function signIn(){
    let payload = {email: emailSignin.value, password:passwordSignin.value}
    let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/login.php',payload).then(
        function (response) {
        console.log(response.data);
        // I need this data here ^^
        localStorage.setItem('jwt', response.data.jwt)
        console.log(localStorage)
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
}
