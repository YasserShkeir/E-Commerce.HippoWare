const clients_list = document.querySelector('.clients-list');

function renderClient(data){
// console.log(data)

for(i = 0; i<=data.length; i++){
    

// checking user's ban status
        let ban_btn_bg_class = 'red-btn';
        let ban_btn_txt = 'Ban Client';
// console.log(parseInt(client.accepted)+1, client)
            if(parseInt(data[i].accepted) == 0){
                ban_btn_bg_class = 'light-btn';
                ban_btn_txt = 'UnBan Client';

            }
        
        // rendering user's data
        clients_list.innerHTML += `<div class="client-div">
                <div class="left-section">
                <img
                    src="${data[i].image}"
                    alt=""
                />

                <div class="info">
                    <h3>${data[i].first_name} ${data[i].last_name}</h3>
                    <p>
                    Registered at <b id="registration_date">${data[i].date}<b>
                    
                </div>
                </div>

                <div class="right-section">
                

                <button class="${ban_btn_bg_class} ban-btn " id= "${data[i].id}">
                    <i class="material-icons">block</i>
                    <p>${ban_btn_txt}</p>
                </button>

                
                </div>
            </div>`
{/* <button class="dark-btn">
<i class="material-icons">leaderboard</i>
<p>View Stats</p>
</button> */}

// console.log(document.querySelector('.ban-btn').classList, document.querySelector('.ban-btn').id)

            const ban_btn = document.querySelector('.ban-btn');
            let ban_btns = Object.values(document.getElementsByClassName('ban-btn'));

            ban_btns.forEach(element => {
                element.addEventListener('click', () => {
                    console.log(element.id, element.classList);
                    
                    if(element.classList.contains('red-btn')){
                        element.classList.add('light-btn');
                        element.classList.remove('red-btn');
                        element.innerHTML = '<i class="material-icons">block</i> <p>UnBan Client</p>';
                    }else{
                        element.classList.add('red-btn');
                        element.classList.remove('light-btn');
                        element.innerHTML = '<i class="material-icons">block</i> <p>Ban Client</p>';
                    }

                let payload = {id: element.id }
                let config = {
                    headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjUyNzgwNTIsImRhdGEiOnsiaWQiOiI3IiwibmFtZSI6InRlc3QxIGFwaTExIiwidXNlcl90eXBlIjoiMSIsImVtYWlsIjoiYXBpLXRlc3QgZW1haWxzZGFzIn19.AAL2O2NtLqWh9B9ni2-GsHYvr7CcTy8xfB0LQOR3aAU'}
                };
                let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/admin/client-ban.php',payload, config).then(
                    function (response) {
                    
                })
                .catch(function (error) {
                    console.log(error);
                })
                });
            });
    };
};

function fetchingClients(sortby_par, filter_par, date_par, search_par){


    let payload = {sortby: sortby_par, filter: filter_par, date: date_par, search: search_par}
        let config = {
            headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjUyNzgwNTIsImRhdGEiOnsiaWQiOiI3IiwibmFtZSI6InRlc3QxIGFwaTExIiwidXNlcl90eXBlIjoiMSIsImVtYWlsIjoiYXBpLXRlc3QgZW1haWxzZGFzIn19.AAL2O2NtLqWh9B9ni2-GsHYvr7CcTy8xfB0LQOR3aAU'}
        };
        let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/admin/clients.php',payload, config).then(
            function (response) {
            renderClient(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })

}
// MAIN FETCH
fetchingClients(0, 2, 0, 0);

// NEW FETCH ON CHANGE
const search_input = document.getElementById('search_input');
const sortby_input = document.getElementById('sortby_input');
const from_date_input = document.getElementById('from_date_input');
const to_date_input = document.getElementById('to_date_input');
let search_input_value = 0;
let sortby_input_value = 0;
let date_input_value = 0;

search_input.addEventListener('input', ()=>{
    search_input_value = search_input.value;
    clients_list.innerHTML = '';
    fetchingClients(sortby_input_value, 2, date_input_value, search_input.value);
});

sortby_input.addEventListener('change', ()=>{
    sortby_input_value = sortby_input.value;
    clients_list.innerHTML = '';
    fetchingClients(sortby_input_value, 2, date_input_value, search_input.value);
});

from_date_input.addEventListener('change', ()=>{
    to_date_input.addEventListener('change', ()=>{
        date_input_value = `${from_date_input.value} ${to_date_input.value}`;
        clients_list.innerHTML = '';
        fetchingClients(sortby_input_value, 2, date_input_value, search_input.value);
    });
});

