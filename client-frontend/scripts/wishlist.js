window.onload = () => {
  const navBarCaller = () => {
    const navBar = document.querySelector(".client-nav");
    navBar.innerHTML = `<a href="landingPage.html"
    ><img id="navLogo" src="../assets/images/logo-removebg-preview.png"
  /></a>
  <div class="client-nav-links flex">
    <div class="client-nav-link">
      <a href="editProfile.html">Profile</a>
    </div>
    <div class="client-nav-link">
      <a href="wishlist.html">Wishlist</a>
    </div>
    <div class="client-nav-link">
      <a href="favorites.html">Favorites</a>
    </div>
  </div>
  <div class="client-nav-search">
    <i class="fa fa-search"></i>
    <input id="search" type="text" placeholder="Search" />
  </div>
  
  <div class="mobile-links">
    <div class="mobile-client-nav-link">
      <a href="editProfile.html">Profile</a>
    </div>
    <div class="mobile-client-nav-link">
      <a href="wishlist.html">Wishlist</a>
    </div>
    <div class="mobile-client-nav-link">
      <a href="favorites.html">Favorites</a>
    </div>
    <div class="mobile-client-nav-link">
      <a href="cart.html"><i class="fa fa-shopping-cart"></i></a>
    </div>
  </div>
  
  <div class="logOut" class="client-nav-link">Log Out</div>
  <div class="client-nav-link">
    <a href="cart.html"><i class="fa fa-shopping-cart"></i></a>
  </div>
  <div id="navMenu">
    <button id="navMenuBTN">
      <i class="fa fa-bars" style="font-size: 20px"></i>
    </button>
  </div>`;

    const menuClicker = document.querySelector("#navMenuBTN");
    const searchBar = document.querySelector(".client-nav-search");
    const mobileNav = document.querySelector(".mobile-links");
    const logout = document.querySelector(".logOut");

    menuClicker.addEventListener("click", () => {
      if (mobileNav.style.display == "flex") {
        mobileNav.style.display = "none";
        searchBar.style.display = "flex";
        logout.style.display = "flex";
      } else {
        mobileNav.style.display = "flex";
        searchBar.style.display = "none";
        logout.style.display = "none";
      }
    });
  };

  const footerCaller = () => {
    const footer = document.querySelector(".client-footer");
    footer.innerHTML = `<div class="footer-content flex">
    <a href="landingPage.html"
      ><img src="../assets/images/logo-removebg-preview.png"
    /></a>
    <div class="footer-col flex-col">
      <h3>Navigation</h3>
      <a href="landingPage.html">Home</a>
      <a href="editProfile.html">Edit Profile</a>
    </div>
    <div class="footer-col flex-col">
      <a href="favorites.html">Favorites</a>
      <a href="wishlist.html">Wishlist</a>
    </div>
  </div>
  <div class="footer-caption">© 2022 Made by Hippos 🦛</div>`;
  };

  navBarCaller();
  footerCaller();
};

// RENDER Products

const whishlist_items = document.querySelector('.whishlist-items');

function renderWishlist(data){


for(i=0; i<data.length; i++){
  whishlist_items.innerHTML += `<section class="whishlist-items">

      <div class="whishlist-product">

        <!-- PRODUCTS LEFT SIDE -->
        <div class="left-side">
          <img src="${data[i].image}" alt="">
          <div>
            <h3>${data[i].name}</h3>
            <p>color <span class="color-div" style="background:${data[i].color}; color:${data[i].color};">00</span></p>
            <p>size <span id="size">${data[i].size}</span></p>
            <h3 id="price">${data[i].price}$</h3>
          </div>
        </div>

        <!-- PRODUCTS RIGHT SIDE -->
        <div class="right-side">
          <button class="purchase-btn" id="${data[i].id}" color="${data[i].color}" size="${data[i].size}" >Purchase</button>
        <a href="#" class="remove-link" id="${data[i].id}">Remove</a>
        </div>

      </div>

    </section>`;

    // PURCHASE FUNCTIONALITY
    let purchase_btns = Object.values(document.getElementsByClassName('purchase-btn'));
    purchase_btns.forEach(element => {
                element.addEventListener('click', () => {

                  
                  let itemColor = element.getAttribute('color');
                  let itemSize = element.getAttribute('size');
                  console.log(itemColor, itemSize);
                  
                  let payload = {product: element.id,  color: itemColor, size: itemSize}
                  let config = {
                      headers: {'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjU1MzQwMjMsImRhdGEiOnsiaWQiOiI4IiwibmFtZSI6ImNsaWVudCAgY2xpZW50IiwidXNlcl90eXBlIjoiMyIsImVtYWlsIjoiY2xpZW50QGdtYWlsLmNvbSJ9fQ.qonDxT0UxvbkMQtskPy1zL05LpuSkbTLRX4VIisjr_g'}
                  };
                  let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/client/immediate-purchase.php',payload, config).then(
                      function (response) {
                      console.log(response);
                      element.style.background = 'green';
                      element.style.color = 'white';
                      element.innerHTML = 'Purchased';
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
                })
              });


    // REMOVE FUNCTIONALITY
    let remove_links = Object.values(document.getElementsByClassName('remove-link'));
    remove_links.forEach(element => {
                element.addEventListener('click', () => {
                  
                  let payload = {product: element.id}
                  let config = {
                      headers: {'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjU0OTcxMjIsImRhdGEiOnsiaWQiOiI4IiwibmFtZSI6ImNsaWVudCAgY2xpZW50IiwidXNlcl90eXBlIjoiMyIsImVtYWlsIjoiY2xpZW50QGdtYWlsLmNvbSJ9fQ.TGAuZo0TnWnpPsdS2j8KBPv1x3zX2svqzANeZ8FHDwg'}
                  };
                  let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/client/delete-whishlist.php',payload, config).then(
                      function (response) {
                      console.log(response);
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
                  window.location.reload();
                })
              });
  };
};

// RENDER ITEMS
// function productData(){}
    let config = {
        headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjU0OTcxMjIsImRhdGEiOnsiaWQiOiI4IiwibmFtZSI6ImNsaWVudCAgY2xpZW50IiwidXNlcl90eXBlIjoiMyIsImVtYWlsIjoiY2xpZW50QGdtYWlsLmNvbSJ9fQ.TGAuZo0TnWnpPsdS2j8KBPv1x3zX2svqzANeZ8FHDwg'}
    };
    let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/client/whishlist.php', null, config).then(
        function (response) {
        renderWishlist(response.data)
        console.log(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });

