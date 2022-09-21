window.onload = () => {
  // const sellers_container = document.getElementById("sellers_container");
  // const clients_container = document.getElementById("clients_container");
  // const header_clients_btn = document.getElementById("header_clients_btn");
  // const header_sellerss_btn = document.getElementById("header_sellerss_btn");

  const navBar = document.querySelector(".nav-bar");

  const navContent = `<img
src="/admin-electron/assets/images/logo-removebg-preview.png"
alt=""
class="header-logo"
/>

<div class="header-links">
<a
  href="admin_sellers.html"
  class="header-link"
  id="header_sellerss_btn"
  >Sellers</a
>
<a href="admin_client.html" class="header-link" id="header_clients_btn">Clients</a>

<a href="admin_infographics.html" class="header-link">Statistics</a>
<a href="#" class="header-link">Log Out</a>
</div>`;

  navBar.innerHTML += navContent;

  // header_sellerss_btn.addEventListener('click', ()=>{
  //     sellers_container.style.display = 'flex';
  //     clients_container.style.display = 'none';
  // });

  // header_clients_btn.addEventListener('click', ()=>{
  //     clients_container.style.display = 'flex';
  //     sellers_container.style.display = 'none';
  // });
};
