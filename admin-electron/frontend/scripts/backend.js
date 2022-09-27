
// ADMIN LOGIN
// import axios from 'axios';
const login_btn = document.querySelector('.login-btn');
const email_input = document.getElementById('email_input');
const password_input = document.getElementById('password_input');
localStorage.setItem('admin_name', '');
// let  admin_name;

login_btn.addEventListener('click', (e)=>{

    e.preventDefault();

    if(email_input.value != '' && password_input.value != ''){
        async function doPostRequest() {
            let payload = { "email": email_input.value,
                            "password": password_input.value };
            let res = await axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/admin/admin-login.php', payload);
            let data = res.data;
            if(!data.status){
                window.location.reload();
                alert(data.message)
            }else{
                localStorage.setItem('admin_name', data.name);
                localStorage.setItem('jwt', data.jwt);
                window.location = 'admin_sellers.html';
            }
        }
        doPostRequest();
    }
})
