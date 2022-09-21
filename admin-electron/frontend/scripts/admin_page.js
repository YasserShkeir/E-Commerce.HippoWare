window.onload = () => {
  // const sellers_container = document.getElementById("sellers_container");
  // const clients_container = document.getElementById("clients_container");
  // const header_clients_btn = document.getElementById("header_clients_btn");
  // const header_sellerss_btn = document.getElementById("header_sellerss_btn");

  // NAVBAR COMPONENT
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

  // SELLER COMPONENT

  const sellersList = document.querySelector(".sellers-list");

  const rightSectionBtn1 = (status) => {
    if (status == "Seller since") {
      return `<button class="light-btn">
      <i class="material-icons">edit</i>
      <p>Edit Seller</p>
    </button>`;
    }
    if (status == "Requested on") {
      return `<button class="light-btn">
      <i class="material-icons">done</i>
      <p>Approve Request</p>
    </button>`;
    }
  };

  const rightSectionBtn2 = (status) => {
    if (status == "Seller since") {
      return `<button class="red-btn">
      <i class="material-icons">delete</i>
      <p>Delete Seller</p>
    </button>`;
    }
    if (status == "Requested on") {
      return `<button class="red-btn">
      <i class="material-icons">cancel</i>
      <p>Deny Request</p>
    </button>`;
    }
  };

  let sellerProfiles = [
    {
      image: "/admin-electron/assets/images/logo-removebg-preview.png",
      Name: "Yasser Shkeir",
      Status: "Seller since",
      Date: "10/10/2010",
      leftBtn: `${rightSectionBtn1("Seller since")}`,
      rightBtn: `${rightSectionBtn2("Seller since")}`,
    },
    {
      image: "/admin-electron/assets/images/logo-removebg-preview.png",
      Name: "Ching chong",
      Status: "Requested on",
      Date: "10/10/2010",
      leftBtn: `${rightSectionBtn1("Requested on")}`,
      rightBtn: `${rightSectionBtn2("Requested on")}`,
    },
  ];

  for (seller of sellerProfiles) {
    sellersList.innerHTML += `<div class="sellers-div">
    <div class="left-section">
      <img
        src="${seller.image}"
        alt=""
      />
  
      <div class="info">
        <h3>${seller.Name}</h3>
        <h4>
        ${seller.Status} <span id="registration_date">${seller.Date}</span>
        </h4>
      </div>
    </div>
  
    <div class="right-section">
      ${seller.leftBtn}
      ${seller.rightBtn}
      
    </div>
  </div>`;
  }

  // header_sellerss_btn.addEventListener('click', ()=>{
  //     sellers_container.style.display = 'flex';
  //     clients_container.style.display = 'none';
  // });

  // header_clients_btn.addEventListener('click', ()=>{
  //     clients_container.style.display = 'flex';
  //     sellers_container.style.display = 'none';
  // });
};
