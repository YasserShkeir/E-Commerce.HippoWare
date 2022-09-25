window.onload = () => {
  localStorage.setItem("storeid", 2)
  localStorage.setItem("jwt", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjU1MzQyNjMsImRhdGEiOnsiaWQiOiIxIiwibmFtZSI6InRlc3QxIGFwaTExIiwidXNlcl90eXBlIjoiMyIsImVtYWlsIjoiYXBpLXRlc3QgZW1haWxzZGEifX0.qD2Dw_a4EIr0rlbuzpcar-esx8Ttog-bP8vXrMmC54E")
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

  //Chat Section


  const messages = document.querySelector("#messages");
  const sendMessage = document.querySelector("#sendMessage");

  const addChat = () => {
    let config = {
      headers: { 'Authorization': localStorage.getItem('jwt') }
    }
    payload = {
      store: localStorage.getItem("storeid")
    }
    axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/chat.php', payload, config).then(
      function (response) {
        for(const mess of response.data){
          let timestamp = mess['timestamp']
          console.log(timestamp)
          messages.innerHTML += `<div class="messageCard sender flex">
                                  <div>
                                    <h5>You</h5>
                                    <h6>${mess['content']}</h6>
                                    <p>SENT AT ${time}</p>
                                  </div>
                                 </div>`;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    messages.innerHTML += `<div class="messageCard flex">
        <div>
          <h5>Store Name</h5>
          <h6>Welcome to our Store!</h6>
          <p>SENT AT NOW</p>
        </div>
      </div>`;

    axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/chat.php', payload, config).then(
      function (response) {
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const chatBox = document.querySelector("#messaging-window");
  const messagingWindow = document.querySelector("#messaging-window-init");
  const messageForm = document.querySelector("#message-form");
  const direction = document.querySelector("#direction");

  messagingWindow.addEventListener("click", () => {
    addChat()
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
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();

        messageContent.value = "";
      }

      // console.log(messageContent.value);
    });
  }

  // const chatBtn = document.querySelector("#chat-btn");

  // chatBtn.addEventListener("click", () => {
  //   console.log(123);
  // });
  const storeText = document.getElementById('seller-details-txt')
  const sellerImg = document.getElementById('seller-img')
  const discount = document.getElementById('discount-disclaimer')
  let productsAll = document.getElementById('products-list')
  let prods = new Array()

  const buildcard = (data) => {
    const card = document.createElement('div')
    card.classList.add("product-card")
    productsAll.appendChild(card)
    prods.push(card)

    const img = document.createElement('img')
    img.id = "product-card"
    img.src = `../../../../..${data['image']}`
    card.appendChild(img)

    const name = document.createElement('div')
    name.id = "product-card"
    name.innerHTML = data['name']
    card.appendChild(name)

    const colors = document.createElement('div')
    colors.id = "product-colors"
    colors.innerHTML = `Colors: <span>${data['color']}</span>`
    card.appendChild(colors)

    const sizes = document.createElement('div')
    sizes.id = "product-sizes"
    sizes.innerHTML = `Sizes: ${data['color']}`
    card.appendChild(sizes)

    const price = document.createElement('div')
    price.id = "product-price"
    price.innerHTML = `$${data['price']}`
    card.appendChild(price)

    card.addEventListener('click', () => {
      localStorage.setItem("itemId", data['id'])
      window.open("client-frontend/html/itemProfile.html", "_self")
    })
  }



  let payload = {
    storeid: localStorage.getItem("storeid")
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/store-details.php', payload, null).then(
    function (response) {
      storeText.innerHTML = `<h1>Welcome to <span>${response.data[0]['name']}</span></h1>
          <h4>${response.data[0]['welc_msg']}</h4>`
      sellerImg.src = `../../../../..${response.data[0]['image']}`
    })
    .catch(function (error) {
      console.log(error);
    })
  payload = {
    store: localStorage.getItem("storeid")
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/get-dis.php', payload, null).then(
    function (response) {
      discount.innerHTML = `<h1>
        Purchase a total amount of $<span id="purchase-amt">${response.data[0]['discount']}</span> and get
        <span id="purchase-amt">${response.data[0]['limits']}</span>% discount!
      </h1>`
    })
    .catch(function (error) {
      console.log(error);
    })

  payload = {
    storeid: localStorage.getItem("storeid"),
    category: 0
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/store-products.php', payload, null).then(
    function (response) {
      for (const data of response.data) {
        buildcard(data)
      }
    })
    .catch(function (error) {
      console.log(error);
    })

  const cats = document.getElementById('categorySelect')

  const addCat = (data) => {
    const option = document.createElement('option')
    option.value = data['name']
    option.innerHTML = data['name']
    cats.appendChild(option)
  }

  payload = {
    storeid: localStorage.getItem("storeid")
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/categories.php', payload, null).then(
    function (response) {
      console.log(response.data)
      for (const data of response.data) {
        addCat(data)
      }
    })
    .catch(function (error) {
      console.log(error);
    })

  cats.addEventListener('change', () => {
    for (const card of prods) {
      productsAll.removeChild(card)
    }
    prods = new Array()
    let categ
    console.log(cats.value)
    if (cats.value == "Choose Category") {
      categ = 0
    } else categ = cats.value
    payload = {
      storeid: localStorage.getItem("storeid"),
      category: categ
    }
    axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/store-products.php', payload, null).then(
      function (response) {
        for (const data of response.data) {
          buildcard(data)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  })
};
