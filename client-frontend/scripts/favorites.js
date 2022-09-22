window.onload = () => {
  const navBar = document.querySelector(".client-nav");
  navBar.innerHTML = `<a href="landingPage.html"><img src="../assets/images/logo-removebg-preview.png" /></a>
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
      <div id="logOut" class="client-nav-link">Log Out</div>
      <div class="client-nav-link"><a href="cart.html"><i class="fa fa-shopping-cart"></i></a></div>
    `;
};
