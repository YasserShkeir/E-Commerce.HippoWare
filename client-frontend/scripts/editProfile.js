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

  //   // EDIT PROFILE IMG

  let new_profile_img = document.getElementById("profile_img");
  let default_profile_img_btn = document.getElementById("profile_img_input");

  new_profile_img.addEventListener("click", () => {
    default_profile_img_btn.click();
  });

  default_profile_img_btn.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const result = reader.result;
        new_profile_img.src = result;
      };
      reader.readAsDataURL(file);
    }
  });

  // EDIT PROFILE FUNCTIONALITY
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("email");
  const building_number = document.getElementById("building_number");
  const home_number = document.getElementById("home_number");
  const street_address = document.getElementById("street_address");
  const current_password = document.getElementById("current_password");
  const new_password = document.getElementById("new_password");
  const confirm_new_password = document.getElementById("confirm_new_password");
  const profile_img_input = document.getElementById("profile_img_input");
  const save_changes = document.getElementById("save_changes");

  save_changes.addEventListener("click", () => {
    let payload = {
      image: profile_img_input.value,
      first_name: fname.value,
      last_name: lname.value,
      username: fname.value + lname.value,
      email: email.value,
      password: new_password.value,
    };
    let config = {
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjU1NjYxMDMsImRhdGEiOnsiaWQiOiIyMyIsIm5hbWUiOiJCYW4gTWUiLCJ1c2VyX3R5cGUiOiIzIiwiZW1haWwiOiJiYW5tZUBnbWFpbC5jb20ifX0.fbCucMT3poOUrQ_i1Q8cyUHrlqV3YVV5Rdft-4-e1H0",
      },
    };
    let res = axios
      .post(
        "http://localhost/E-Commerce.HippoWare/ecommerce-server/client/edit-profile.php",
        payload,
        config
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  // SEARCH IMPLEMENTED
  const search_input = document.getElementById("search");
  search_input.addEventListener("input", () => {
    document.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        localStorage.setItem("searchItem", search_input.value);
        window.location = '../html/searchResults.html';
        console.log(search_input.value)
      }
    });
  });
};
