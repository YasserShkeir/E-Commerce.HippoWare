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

  const productImg = document.querySelector("#product-img img");
  const productDesc = document.querySelector("#product-description span");
  const productBrand = document.querySelector("#product-brand span");
  const productSeller = document.querySelector("#product-seller span");
  const productPrice = document.querySelector("#product-price span");
  const productColors = document.querySelector("#product-colors span");
  const productSizes = document.querySelector("#product-sizes span");

  let fetchedProduct = {
    productImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
    productDesc: "hello",
    productBrand: "From",
    productSeller: "JS",
    productPrice: "100",
    productColors: "Red",
    productSizes: "S, M, L",
  };

  productImg.src = fetchedProduct.productImg;
  productDesc.innerHTML = fetchedProduct.productDesc;
  productBrand.innerHTML = fetchedProduct.productBrand;
  productSeller.innerHTML = fetchedProduct.productSeller;
  productPrice.innerHTML = fetchedProduct.productPrice;
  productColors.innerHTML = fetchedProduct.productColors;
  productSizes.innerHTML = fetchedProduct.productSizes;
};
