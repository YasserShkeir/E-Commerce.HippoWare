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

  let arr = [
    {
      imgSrc: "../assets/images/logo-removebg-preview.png",
      productName: "123",
      productColor: "1231",
      qty: "4",
      itemPrice: "100",
    },
    {
      imgSrc: "../assets/images/logo-removebg-preview.png",
      productName: "333121",
      productColor: "1312",
      qty: "3",
      itemPrice: "100",
    },
  ];

  const cardsList = document.querySelector("#cart-content");

  arr.forEach((card) => {
    cardsList.innerHTML += `<div class="item-card flex">
    <div class="check-box">
      <input type="checkbox" />
    </div>
    <div class="item-card-img">
      <img src="${card.imgSrc}" />
    </div>
    <div class="item-card-details flex-col">
      <h3>${card.productName}</h3>
      <h4>Color: <span>${card.productColor}</span></h4>
      <h4>
        Quantity: <button class="qtyMins">-</button><span id="counter"> ${
          card.qty
        } </span
        ><button class="qtyPlus">+</button>
      </h4>
      <h2>Item Price: $<span>${card.itemPrice}</span></h2>
    </div>
    <div class="item-card-price">$<span id="totalPrice">${
      card.itemPrice * card.qty
    }</span></div>
  </div>`;
  });

  const cards = document.querySelectorAll(".item-card");
  const minusButtons = document.querySelectorAll(".qtyMins");
  const plusButtons = document.querySelectorAll(".qtyPlus");
  const counters = document.querySelectorAll("#counter");
  const totals = document.querySelectorAll("#totalPrice");

  arr.forEach((card, index) => {
    let counter = counters[index];
    let total = totals[index];
    let minusBtn = minusButtons[index];
    let plusBtn = plusButtons[index];

    minusBtn.addEventListener("click", () => {
      if (counter.innerHTML <= 0) {
        counter.innerHTML = 0;
        total.innerHTML = counter.innerHTML * card.itemPrice;
      } else {
        counter.innerHTML--;
        total.innerHTML = counter.innerHTML * card.itemPrice;
      }
    });

    plusBtn.addEventListener("click", () => {
      if (counter.innerHTML == 10) {
        counter.innerHTML = 10;
        total.innerHTML = counter.innerHTML * card.itemPrice;
      } else {
        counter.innerHTML++;
        total.innerHTML = counter.innerHTML * card.itemPrice;
      }
    });
  });

  const checkboxes = document.querySelectorAll(".check-box input");

  checkboxes.forEach((element, index) => {
    checkboxes[index].addEventListener("click", () => {
      console.log(element);
    });
  });
};
