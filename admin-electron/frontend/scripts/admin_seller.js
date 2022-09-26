    const sellersList = document.querySelector(".sellers-list");

    const rightSectionBtn1 = (status, id, name) => {
        if (status) {
        return `<button class="light-btn edit-btn" id="${id}" name="${name}">
        <i class="material-icons">edit</i>
        <p>Edit Seller</p>
        </button>`; 
        }else{
        return `<button class="light-btn approve-btn" id="${id}">
        <i class="material-icons">done</i>
        <p>Approve Request</p>
        </button>`;
        }
    };

    const rightSectionBtn2 = (status, id) => {
        if (status) {
        return `<button class="red-btn delete-btn" id="${id}">
        <i class="material-icons">delete</i>
        <p>Delete Seller</p>
        </button>`;
        }else{
        return `<button class="red-btn deny_btn" id="${id}">
        <i class="material-icons">cancel</i>
        <p>Deny Request</p>
        </button>`;
        }
    };

    let leftBtn;
    let rightBtn;
    let status; 

function renderSellers(data){

    for (i=0; i < data.length; i++) {
        
        leftBtn = rightSectionBtn1(parseInt(data[i].accepted), data[i].id, data[i].first_name+' '+data[i].last_name);
        
        rightBtn = rightSectionBtn2(parseInt(data[i].accepted), data[i].id);
        if(parseInt(data[i].accepted)){
            status = 'Registered at';
        }else{
            status = 'Requested at';
        }

        sellersList.innerHTML += `<div class="sellers-div">
            <div class="left-section">
            <img
                src="${data[i].image}"
                alt=""
            />
        
            <div class="info">
                <h3>${data[i].first_name} ${data[i].last_name}</h3>
                <p>
                ${status} <b id="registration_date">${data[i].date}</b>
                </p>
            </div>
            </div>
    
            <div class="right-section">

            ${leftBtn}
            ${rightBtn}
            
            </div>
        </div>`;

    // detecting deletion request and triggering deleting function
    let delete_btns = Object.values(document.getElementsByClassName('delete-btn'));
        delete_btns.forEach(element => {
                element.addEventListener('click', () => {
                    deleteSeller(element.id);
                });
            });
    // detecting denying request and triggering denying function
    let deny_btns = Object.values(document.getElementsByClassName('deny_btn'));
        deny_btns.forEach(element => {
                element.addEventListener('click', () => {
                    denySeller(element.id);
                });
            });

    // detecting edit request and triggering editing function
    let edit_btns = Object.values(document.getElementsByClassName('edit-btn'));
        edit_btns.forEach(element => {
                element.addEventListener('click', () => {
                    editSeller(element.id, element.name);
                });
            });
    // detecting approving request and triggering approving function
    let approve_btns = Object.values(document.getElementsByClassName('approve_btn'));
        approve_btns.forEach(element => {
                element.addEventListener('click', () => {
                    approveSeller(element.id);
                });
            });

    };
};
    
// FETCHING USERS
function fetchingSellers(sortby_par, filter_par, date_par, search_par){


    let payload = {sortby: sortby_par, filter: filter_par, date: date_par, search: search_par}
        let config = {
            headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjUyNzgwNTIsImRhdGEiOnsiaWQiOiI3IiwibmFtZSI6InRlc3QxIGFwaTExIiwidXNlcl90eXBlIjoiMSIsImVtYWlsIjoiYXBpLXRlc3QgZW1haWxzZGFzIn19.AAL2O2NtLqWh9B9ni2-GsHYvr7CcTy8xfB0LQOR3aAU'}
        };
        let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/admin/sellers.php',payload, config).then(
            function (response) {
            renderSellers(response.data)
            // console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
};


// MAIN FETCH
fetchingSellers(0, 0, 0, 0);

// NEW FETCH ON CHANGE
const search_input = document.getElementById('search_input');
const sortby_input = document.getElementById('seller_sortby_input');
const filter_input = document.getElementById('filter_input');
const from_date_input = document.getElementById('from_date_input');
const to_date_input = document.getElementById('to_date_input');
let search_input_value = 0;
let sortby_input_value = 0;
let filter_input_value = 0;
let date_input_value = 0;

search_input.addEventListener('input', ()=>{
    search_input_value = search_input.value;
    sellersList.innerHTML = '';
    fetchingSellers(sortby_input_value, filter_input_value, date_input_value, search_input.value);
});

sortby_input.addEventListener('change', ()=>{
    sortby_input_value = sortby_input.value;
    sellersList.innerHTML = '';
    fetchingSellers(sortby_input_value, filter_input_value, date_input_value, search_input.value);
});

filter_input.addEventListener('change', ()=>{
    filter_input_value = parseInt(filter_input.value);
    sellersList.innerHTML = '';
    fetchingSellers(sortby_input_value, filter_input_value, date_input_value, search_input.value);
});

from_date_input.addEventListener('change', ()=>{
    to_date_input.addEventListener('change', ()=>{
        date_input_value = `${from_date_input.value} ${to_date_input.value}`;
        sellersList.innerHTML = '';
        fetchingSellers(sortby_input_value, filter_input_value, date_input_value, search_input.value);
    });
});


// DELETING SELLERS
function deleteSeller(user_id){
    let payload = {id: user_id}
    let config = {
        headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjUyNzgwNTIsImRhdGEiOnsiaWQiOiI3IiwibmFtZSI6InRlc3QxIGFwaTExIiwidXNlcl90eXBlIjoiMSIsImVtYWlsIjoiYXBpLXRlc3QgZW1haWxzZGFzIn19.AAL2O2NtLqWh9B9ni2-GsHYvr7CcTy8xfB0LQOR3aAU'}
    };
    let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/admin/seller-delete.php',payload, config).then(
        function (response) {
    })
    .catch(function (error) {
        console.log(error);
    });
}

// DENYING SELLERS REQUEST
function denySeller(user_id){
    let payload = {id: user_id}
    let config = {
        headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjUyNzgwNTIsImRhdGEiOnsiaWQiOiI3IiwibmFtZSI6InRlc3QxIGFwaTExIiwidXNlcl90eXBlIjoiMSIsImVtYWlsIjoiYXBpLXRlc3QgZW1haWxzZGFzIn19.AAL2O2NtLqWh9B9ni2-GsHYvr7CcTy8xfB0LQOR3aAU'}
    };
    let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/admin/seller-delete.php',payload, config).then(
        function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
}

// EDITING SELLERS
function editSeller(user_id, user_name){
    let form_title = document.getElementById('form-title');
    form_title.innerText = `Edit ${user_name}` ;
    const signup_form_container = document.querySelector('.signup-form-container');
    signup_form_container .style.display = 'block';
        document.getElementById('signup_close_btn').addEventListener('click', ()=>{
    signup_form_container .style.display = 'none';
    form_title.innerText = `Add Seller` ;
    });

        let fname = document.getElementById('fname');
        let lname = document.getElementById('lname');
        let username = document.getElementById('username');
        let email = document.getElementById('email');
        let password = document.getElementById('password');
    document.getElementById('seller-add').addEventListener('click', ()=>{
        
        let payload = {id: user_id, first_name: fname.value, last_name: lname.value, username: username.value, email: email.value, image: null, password: password.value, user_type_id: 2}
        let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/seller-edit.php',payload).then(
            function (response) {
            console.log(response.data);
            // I need this data here ^^
            document.getElementById('register-success').style.display='block'
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
        
    });
}

// APPROVING SELLERS REQUEST
function approveSeller(user_id){
    let payload = {id: user_id}
    let config = {
        headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjUyNzgwNTIsImRhdGEiOnsiaWQiOiI3IiwibmFtZSI6InRlc3QxIGFwaTExIiwidXNlcl90eXBlIjoiMSIsImVtYWlsIjoiYXBpLXRlc3QgZW1haWxzZGFzIn19.AAL2O2NtLqWh9B9ni2-GsHYvr7CcTy8xfB0LQOR3aAU'}
    };
    let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/admin/seller-approval.php',payload, config).then(
        function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
}

// ADD SELLER
function addSeller(firstName, lastName, userName, email, password){
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