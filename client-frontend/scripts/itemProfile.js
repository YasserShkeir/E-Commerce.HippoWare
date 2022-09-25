window.onload = () => {
  if(localStorage.getItem('size')) localStorage.removeItem('size')
  if(localStorage.getItem('color')) localStorage.removeItem('color')
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

    console.log(menuClicker);

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

  footerCaller();
  navBarCaller();

  const productImg = document.querySelector("#product-img img");
  const productDesc = document.querySelector("#product-description span");
  const productSeller = document.querySelector("#product-seller span");
  const productPrice = document.querySelector("#product-price span");
  const productColors = document.querySelector("#product-colors span div");
  const productSizes = document.querySelector("#product-sizes span");
  const productName = document.querySelector("#product-name");


  let payload = {product:localStorage.getItem('itemId')}

  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/general/item-details.php', payload)
    .then(function (response) {//extracting data
      let fetchedProduct = {
        productImg:
          `../../../../../../..${response.data[0]['image']}`,
        productDesc: response.data[0]['description'],
        productSeller: response.data[0]['store'],
        productPrice: response.data[0]['price'],
        productName: response.data[0]['name'],
        productColors: response.data[0]['color'].split(" "),
        productSizes: response.data[0]['size'].split(","),
      }; 
      //filling data now
      productImg.src = fetchedProduct.productImg;
      productDesc.innerHTML = fetchedProduct.productDesc;
      productSeller.innerHTML = fetchedProduct.productSeller;
      productPrice.innerHTML = fetchedProduct.productPrice;
      productName.innerHTML = fetchedProduct.productName

      for(const color of fetchedProduct.productColors){
        const circle = document.createElement('div')
        circle.classList.add('item-color')
        circle.style.backgroundColor = color
        productColors.appendChild(circle)
        circle.addEventListener('click', () =>{ // choosing color and removing other chosen ones

          for(const circle of productColors.children){
            circle.style.border = "#a9cef4 2px solid"
          }

          localStorage.setItem('color',color)
          circle.style.border = "black 3px solid"
        })
      }

      for(const size of fetchedProduct.productSizes){
        const choice = document.createElement('span')
        choice.style.cursor = "pointer"
        choice.innerHTML = ` ${size} `
        productSizes.appendChild(choice)
        choice.addEventListener('click', () =>{ // choosing size and removing other chosen ones
          for(const choice of productSizes.children){
            choice.style.border = "none"
          }
          localStorage.setItem('size',size)
          choice.style.border = "black 3px solid"
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    })
};

// adding button functionalities 

const wish = document.querySelector("#wish")
const cart = document.querySelector("#cart")
const fav = document.querySelector("#fav")

wish.addEventListener('click', () => {
  if (localStorage.getItem('size') === null) {
    document.querySelector('#product-sizes').style.color = "red"
  }
  if (localStorage.getItem('color') === null) {
    document.querySelector('#product-colors').style.color = "red"
  }
  if( localStorage.getItem('size') === null || localStorage.getItem('color') === null) return
  
  document.querySelector('#product-colors').style.color = "black"
  document.querySelector('#product-sizes').style.color = "black"
  let payload = {
    product: localStorage.getItem('itemId'),
    size: localStorage.getItem('size'),
    color: localStorage.getItem('color')
  }
  let config = {
    headers: { 'Authorization': localStorage.getItem('jwt') }
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/client/add-whishlist.php', payload, config).then(
    function (response) {
      if(response.data) wish.innerHTML = "Added"
      else wish.innerHTML = "Already added"
    })
    .catch(function (error) {
      console.log(error);
    })
})

cart.addEventListener('click', () => {
  if (localStorage.getItem('size') === null) {
    document.querySelector('#product-sizes').style.color = "red"
  }
  if (localStorage.getItem('color') === null) {
    document.querySelector('#product-colors').style.color = "red"
  }
  if( localStorage.getItem('size') === null || localStorage.getItem('color') === null) return
  
  document.querySelector('#product-colors').style.color = "black"
  document.querySelector('#product-sizes').style.color = "black"
  let payload = {
    product: localStorage.getItem('itemId'),
    size: localStorage.getItem('size'),
    color: localStorage.getItem('color'),
    quantity:document.getElementById('quantity').value
  }
  let config = {
    headers: { 'Authorization': localStorage.getItem('jwt') }
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/client/add-cart.php', payload, config).then(
    function (response) {
      if(response.data) cart.innerHTML = "Added"
      else cart.innerHTML = "Already added"
    })
    .catch(function (error) {
      console.log(error);
    })
})
fav.addEventListener('click', () => {
  let payload = {
    product: localStorage.getItem('itemId')
  }
  let config = {
    headers: { 'Authorization': localStorage.getItem('jwt') }
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/client/add-favs.php', payload, config).then(
    function (response) {
      if(response.data) fav.style.color = "red"
    })
    .catch(function (error) {
      console.log(error);
    })
})