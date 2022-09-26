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

  let payload = {
    product: localStorage.getItem("itemId"), //////////////////////////////////////////////////////////////////////////////////
  };
  navBarCaller();
  footerCaller();

  const cardsList = document.querySelector("#cart-content");
  const purchase = document.getElementById("purchase");
  const cartTotal = document.getElementById("total");
  const code = document.getElementById("code");
  let cartItems = new Array();
  let checked = new Array();

  function removeFirst(arr, target) {
    var idx = arr.indexOf(target);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
    return arr;
  }
  const numbers = [5, 10, 15];
  console.log(removeFirst(numbers, 10));

  const addItem = (card) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");
    itemCard.classList.add("flex");
    itemCard.id = card["id"];
    cardsList.appendChild(itemCard);

    const checkbox = document.createElement("div");
    checkbox.classList.add("check-box");
    itemCard.appendChild(checkbox);

    const input = document.createElement("input");
    input.type = "checkbox";
    checkbox.appendChild(input);

    const imgdiv = document.createElement("div");
    imgdiv.classList.add("item-card-img");
    itemCard.appendChild(imgdiv);

    const img = document.createElement("img");
    img.src = `../../../../..${card["image"]}`;
    imgdiv.appendChild(img);

    const details = document.createElement("div");
    details.classList.add("item-card-details");
    details.classList.add("flex-col");
    itemCard.appendChild(details);

    const name = document.createElement("h3");
    name.innerHTML = card["name"];
    details.appendChild(name);

    const color = document.createElement("h4");
    color.innerHTML = `Color: <span>${card["colorc"]}</span>`;
    details.appendChild(color);

    const quantity = document.createElement("h4");
    quantity.innerHTML = `Quantity: <span>${card["quantity"]}</span>`;
    details.appendChild(quantity);

    const price = document.createElement("h4");
    price.innerHTML = `Price: $<span>${card["price"]}</span>`;
    details.appendChild(price);

    const total = document.createElement("div");
    total.innerHTML = `Total: $<span id="totalPrice">${
      card["price"] * card["quantity"]
    }</span>`;
    total.classList.add("item-card-price");
    itemCard.appendChild(total);

    cartItems.push(itemCard);

    input.addEventListener("change", () => {
      if (!input.checked) {
        cartTotal.innerHTML =
          parseFloat(cartTotal.innerHTML) - card["price"] * card["quantity"];
        removeFirst(checked, card["id"]);
      } else {
        cartTotal.innerHTML =
          parseFloat(cartTotal.innerHTML) + card["price"] * card["quantity"];
        checked.push(card["id"]);
      }
    });
  };

  let config = {
    headers: { Authorization: localStorage.getItem("jwt") },
  };
  axios
    .post(
      "http://localhost/E-Commerce.HippoWare/ecommerce-server/client/cart.php",
      null,
      config
    )
    .then(function (response) {
      for (const data of response.data) {
        addItem(data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  purchase.addEventListener("click", () => {
    for (const item of checked) {
      let payload;
      if (code.value) {
        payload = {
          product: getItem,
          code: code.value,
        };
      } else {
        payload = {
          product: item,
          code: 0,
        };
      }
      let config = {
        headers: { Authorization: localStorage.getItem("jwt") },
      };
      axios
        .post(
          "http://localhost/E-Commerce.HippoWare/ecommerce-server/client/purchase.php",
          payload,
          config
        )
        .then(function (response) {
          cardsList.removeChild(document.getElementById(item));
          removeFirst(checked, item);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
  // SEARCH IMPLEMENTED
const search_input = document.getElementById("search");
search_input.addEventListener("input", () => {
  document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      localStorage.setItem("searchItem", search_input.value);
      window.location = '../html/searchResults.html';
    }
  });
});
};
