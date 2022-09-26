
window.onload = () => {

  // NAVBAR COMPONENT
  const navBar = document.querySelector(".nav-bar");

  const navContent = `<img
src="../../assets/images/logo-removebg-preview.png"
alt=""
class="header-logo"
/>

<div class="header-links">
<a href="admin_sellers.html" class="header-link" id="header_sellerss_btn" >Sellers</a>

<a href="#" class="header-link" id="add_seller_btn" >Add Seller</a>

<a href="admin_client.html" class="header-link" id="header_clients_btn">Clients</a>

<a href="admin_infographics.html" class="header-link">Statistics</a>

<a href="index.html" class="header-link" id="logout_btn">Log Out</a>
</div>`;

  navBar.innerHTML += navContent;
// 

let add_seller_btn = document.getElementById('add_seller_btn');
const signup_form_container = document.querySelector('.signup-form-container');

add_seller_btn.addEventListener('click', ()=>{
  signup_form_container .style.display = 'block';
  
    document.getElementById('signup_close_btn').addEventListener('click', ()=>{
      signup_form_container .style.display = 'none';
    });

    // ADD SELLER
    document.getElementById('seller-add').addEventListener('click', ()=>{
      let fname = document.getElementById('fname');
      let lname = document.getElementById('lname');
      let username = document.getElementById('username');
      let email = document.getElementById('email');
      let password = document.getElementById('password');
      addSeller(fname, lname, username, email, password)
    });

    // LOG OUT
    document.getElementById('logout_btn').addEventListener('click', ()=>{
        
          console.log(localStorage.getItem('jwt'));
          localStorage.removeItem("jwt");
          console.log(localStorage.getItem('jwt')) ;
          debugger
          window.location = 'index.html';
    
  })

});

};

// ADD SELLER
function addSeller(firstName, lastName, userName, email, password){
    let payload = {first_name: firstName.value, last_name: lastName.value, username: userName.value, email: email.value, image: null, password: password.value, user_type_id: 2}
    let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/registration.php',payload).then(
        function (response) {
        document.getElementById('register-success').style.display='block'
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
};

