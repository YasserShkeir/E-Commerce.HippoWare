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

  let products = [
    {
      productName: "JS name",
      colors: "JS",
      sizes: [1, 2, 3],
      price: 200,
    },
    {
      productName: "JS name2",
      colors: "JS",
      sizes: [2, 22, 222],
      price: 300,
    },
  ];

  const productsList = document.querySelector("#products-list");

  for (product of products) {
    let productCard = `<div class="product-card">
  <img src="../assets/images/logo-removebg-preview.png" />
  <div id="product-name">${product.productName}</div>
  <div id="product-colors">
    Colors: <span><div class="item-colors">${product.colors}</div></span>
  </div>
  <div id="product-sizes">Sizes: ${product.sizes}</div>
  <div id="product-price">$${product.price}</div>
</div>`;

    productsList.innerHTML += productCard;
  }

  //Chat Section

  const chatBox = document.querySelector("#messaging-window");
  const messagingWindow = document.querySelector("#messaging-window-init");
  const messageForm = document.querySelector("#message-form");
  const direction = document.querySelector("#direction");

  messagingWindow.addEventListener("click", () => {
    if (messageForm.style.display != "flex") {
      chatBox.style.height = "400px";
      messagingWindow.style.alignItems = "top";
      messageForm.style.display = "flex";
      messageForm.style.flexDirection = "column";
      messageForm.style.flexGrow = "1";
      direction.style.transform = "rotate(0deg)";
    } else {
      chatBox.style.height = "fit-content";
      messagingWindow.style.alignItems = "center";
      messageForm.style.display = "none";
      direction.style.transform = "rotate(180deg)";
    }
  });

  const messages = document.querySelector("#messages");
  const sendMessage = document.querySelector("#sendMessage");

  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  messages.innerHTML += `<div class="messageCard flex">
  <div>
    <h5>Store Name</h5>
    <h6>Welcome to our Store!</h6>
    <p>SENT AT ${time}</p>
  </div>
</div>`;

  if (messageForm.style.display != "flex") {
    sendMessage.addEventListener("click", () => {
      let messageContent = document.querySelector("#messageContent");

      if (messageContent.value == "") {
        alert(
          "🦛 🦛 🦛 🦛 🦛 🦛 🦛 🦛 🦛 \n" +
            "🦛 No empty messages pls :3 🦛\n" +
            "🦛 🦛 🦛 🦛 🦛 🦛 🦛 🦛 🦛 "
        );
      } else {
        1;
        2;
        let today = new Date();
        let time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        messages.innerHTML += `<div class="messageCard sender flex">
      <div>
        <h5>You</h5>
        <h6>${messageContent.value}</h6>
        <p>SENT AT ${time}</p>
      </div>
    </div>`;
        messageContent.value = "";
      }

      // console.log(messageContent.value);
    });
  }

  // const chatBtn = document.querySelector("#chat-btn");

  // chatBtn.addEventListener("click", () => {
  //   console.log(123);
  // });
};
