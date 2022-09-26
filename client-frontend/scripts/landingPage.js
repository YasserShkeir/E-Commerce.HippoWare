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
    <input id="search" type="text" placeholder="Search"/>
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

  // logout

  const logout = document.querySelector(".logOut");

  logout.addEventListener("click", () => {
    console.log("logout");
    localStorage.removeItem("jwt");
    window.open("../../index.html", "_self");
  });

  // top sellers

  const topSeller = document.querySelector("#topSellers");
  const topViews = document.querySelector("#topViews");
  const stores1 = document.querySelector("#stores1");

  const constructproduct = (data, div, flag) => {
    const main = document.createElement("div");
    main.classList.add("store");

    const img = document.createElement("img");
    img.src = `../../../../..${data["image"]}`;
    main.appendChild(img);

    const text = document.createElement("h3");
    text.innerHTML = data["name"];
    main.appendChild(text);

    if (flag) {
      main.addEventListener("click", () => {
        localStorage.setItem("product", data["id"]);
        window.open("sellerProfile.html", "_self");
      });
      div.appendChild(main);
      return;
    }

    main.addEventListener("click", () => {
      localStorage.setItem("itemId", data["id"]);
      window.open("client-frontend/html/itemProfile.html", "_self");
    });
    div.appendChild(main);
  };


  axios
    .post(
      "http://localhost/E-Commerce.HippoWare/ecommerce-server/general/top-viewed.php",
      null,
      null
    )
    .then(function (response) {
      for (const data of response.data) {
        constructproduct(data, topViews, 0);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  axios
    .post(
      "http://localhost/E-Commerce.HippoWare/ecommerce-server/general/top-sellers.php",
      null,
      null
    )
    .then(function (response) {
      for (const data of response.data) {
        constructproduct(data, topSeller, 0);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  axios
    .post(
      "http://localhost/E-Commerce.HippoWare/ecommerce-server/general/stores.php",
      null,
      null
    )
    .then(function (response) {
      for (let i = 0; i < 2 && i < 2; i++) {
        constructproduct(response.data[i], stores1, 1);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  const voucher = document.createElement("div");
  voucher.innerHTML = '<a><img src="../assets/images/voucher.png" /></a>';
  voucher.id = "voucher-card";
  document.getElementById("row").appendChild(voucher);

  voucher.style.cursor = "pointer";
  const voucherPopup = document.querySelector("#voucherForm");
  const closePopup = document.querySelector("#close");

  voucher.addEventListener("click", () => {
    voucherPopup.style.display = "block";
    closePopup.addEventListener("click", () => {
      voucherPopup.style.display = "none";
    });
  });

  voucher.innerHTML = '<a><img src="../assets/images/voucher.png" /></a>';
  voucher.id = "voucher-card";
  document.getElementById("row").appendChild(voucher);

  voucher.style.cursor = "pointer";

  const createVoucher = document.querySelector("#createVoucher");
  const receiverName = document.querySelector("#receiverName");
  const senderName = document.querySelector("#senderName");
  const message = document.querySelector("#message");
  const amount = document.querySelector("#value");
  voucher.addEventListener("click", () => {
    voucherPopup.style.display = "block";
  });

  closePopup.addEventListener("click", () => {
    voucherPopup.style.display = "none";
  });

  createVoucher.onclick = (e) => {
    e.preventDefault();
    if (
      receiverName.value &&
      senderName.value &&
      message.value &&
      amount.value
    ) {
      sendVoucher(receiverName.value, message.value, amount.value);
    }
    voucherPopup.style.display = "none";
  };
  function sendVoucher(rec, msg, val) {
    let payload = {
      username: rec,
      message: msg,
      value: val,
    };
    let config = {
      headers: { Authorization: localStorage.jwt },
    };
    let res = axios
      .post(
        "http://localhost/E-Commerce.HippoWare/ecommerce-server/client/send-voucher.php",
        payload,
        config
      )
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}


const voucher = document.createElement("div");
voucher.innerHTML = '<a><img src="../assets/images/voucher.png" /></a>';
voucher.id = "voucher-card";
document.getElementById("row").appendChild(voucher);


