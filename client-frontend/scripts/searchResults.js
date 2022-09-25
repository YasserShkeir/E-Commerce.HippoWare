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

    logout.addEventListener("click", () => {
      window.open("../../index.html", "_self");
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


  //SEARCH RESULT IMPLEMENT
  const displayed_results_row = document.querySelector('.displayed-results-row');
  let txtToSearch = localStorage.getItem('searchItem');
  const search_text = document.getElementById('search_text');
  search_text.innerText = txtToSearch;
  // console.log(txtToSearch)

  let payload = {search: txtToSearch}

                  let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/products-search.php',payload, null).then(
                      function (response) {
                      console.log(response.data);
                      if(response.data.length <1){
                        displayed_results_row.innerHTML = '<h1>NO RESULT FOUND :(</h1>';
                        displayed_results_row.style.opacity = '.6';
                        displayed_results_row.style.marginBottom = '10%';
                        displayed_results_row.style.marginTop = '10%';
                      }else{
                        renderSearchResult(response.data)
                      }
                      
                  })
                  .catch(function (error) {
                      console.log(error);
                  })




function renderSearchResult(data){
for(i=0; i<data.length; i++){

  displayed_results_row.innerHTML += ` 
        <div class="background style="backgound = url(${data[i],image}); background-repeat: no-repeat; background-size: contain;"
          <div class="name-description">
            <div class="name">${data[i].name}</div>
            <div class="description">${data[i].description}</div>
          </div>
          <div class="store-price">
            <div class="store"></div>
            <div class="price">$${data[i].price}</div>
          </div>
        </div>`;
}
}
};

