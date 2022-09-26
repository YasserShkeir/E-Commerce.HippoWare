const nav_bar = document.querySelector(".nav-bar");
const signup_form_container = document.querySelector(".signup-form-container");
const signin_form_container = document.querySelector(".signin-form-container");
const signup_close_btn = document.querySelector(".signup_close_btn");
const login = document.getElementById("login");
// CREATING NAVBAR ELEMENTS
const logo_img = document.createElement("img");
const search_div = document.createElement("div");
const search_icon_img = document.createElement("img");
const search_input = document.createElement("input");
const header_links_div = document.createElement("div");
const login_btn = document.createElement("button");
const signup_btn = document.createElement("button");
const burger_img = document.createElement("img");

// GIVING NAVBAR ELEMENTS CLASSES
logo_img.classList.add("logo");
search_div.classList.add("search");
search_icon_img.classList.add("search-icon");
search_input.classList.add("search-input");
header_links_div.classList.add("header-links");
login_btn.classList.add("log-out");
signup_btn.classList.add("log-out");
burger_img.classList.add("menu");

// INSERTING VALUES TO ELEMENTS
logo_img.src = "./landingPage/assets/logo.png";
search_icon_img.src = "./landingPage/assets/search-icon.png";
search_input.placeholder = "search";
login_btn.innerText = "Log-in";
signup_btn.innerText = "Sign-up";
burger_img.src = "./landingPage/assets/menu.png";

// APPENDING ELEMENTS IN THEIR RESPECTIVE CONTAINER
nav_bar.append(logo_img, search_div, header_links_div);
search_div.append(search_icon_img, search_input);
header_links_div.append(signup_btn, login_btn);

const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password-confirm");
const sellerSignup = document.getElementById("seller-signup");
const clientSignup = document.getElementById("client-signup");
const emailSignin = document.getElementById("email-signin");
const passwordSignin = document.getElementById("password-signin");
const loginButtonForm = document.getElementById("login");

/**********************User registration*********************/
//password format
function passwordFormat(password) {
  const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return expression.test(password);
}

// SIGN UP POPUP
signup_btn.addEventListener("click", () => {
  signup_form_container.style.display = "block";
});

//seller signup
sellerSignup.addEventListener("click", (event) => {
  document.getElementById("not-matching").style.display = "none";
  document.getElementById("wrong-format").style.display = "none";
  document.getElementById("register-success").style.display = "none";
  event.preventDefault();
  if (
    firstName.value &&
    lastName.value &&
    userName.value &&
    email.value &&
    password.value &&
    confirmPassword.value
  ) {
    if (password.value == confirmPassword.value) {
      if (passwordFormat(password.value)) {
        register(2);
        document.getElementById("register-success").style.display = "Block";
      } else {
        document.getElementById("wrong-format").style.display = "block";
      }
    } else {
      document.getElementById("not-matching").style.display = "block";
    }
  }
});

//clinet signup
clientSignup.addEventListener("click", (event) => {
  document.getElementById("not-matching").style.display = "none";
  document.getElementById("wrong-format").style.display = "none";
  document.getElementById("register-success").style.display = "none";
  event.preventDefault();
  if (
    firstName.value &&
    lastName.value &&
    userName.value &&
    email.value &&
    password.value &&
    confirmPassword.value
  ) {
    if (password.value == confirmPassword.value) {
      if (passwordFormat(password.value)) {
        register(3);
        document.getElementById("register-success").style.display = "Block";
      } else {
        document.getElementById("wrong-format").style.display = "block";
      }
    } else {
      document.getElementById("not-matching").style.display = "block";
    }
  }
});

//function to register users according to their type
function register(type) {
  let payload = {
    first_name: firstName.value,
    last_name: lastName.value,
    username: userName.value,
    email: email.value,
    image: null,
    password: password.value,
    user_type_id: type,
  };
  let res = axios
    .post(
      "http://localhost/E-Commerce.HippoWare/ecommerce-server/general/registration.php",
      payload
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
//close pop-up
document.getElementById("signup_close_btn").onclick = () => {
  signup_form_container.style.display = "none";
};

/**********************User login*********************/
login_btn.onclick = () => {
  signin_form_container.style.display = "block";
};
loginButtonForm.addEventListener("click", (event) => {
  event.preventDefault();
  if (emailSignin.value && passwordSignin.value) {
    signIn();
  }
});
function signIn() {
  let payload = { email: emailSignin.value, password: passwordSignin.value };
  let res = axios
    .post(
      "http://localhost/E-Commerce.HippoWare/ecommerce-server/general/login.php",
      payload
    )
    .then(function (response) {
      if (response.data.message == "Login Successfully") {
        localStorage.setItem("jwt", response.data.jwt);
        if (response.data["user_type"] == 2) {
          window.location.replace("./seller-frontend/html/products.html");
        } else {
          window.location.replace("./client-frontend/html/landingPage.html");
        }
        return response.data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
//close signin pop-up
document.getElementById("signin_close_btn").onclick = () => {
  signin_form_container.style.display = "none";
};

// top sellers

const topSeller = document.querySelector("#topSellers");
const topViews = document.querySelector("#topViews");
const stores1 = document.querySelector("#stores1");
const stores2 = document.querySelector("#stores2");

const constructproduct = (data, div, flag) => {
  const main = document.createElement("div");
  main.classList.add("store");

  const img = document.createElement("img");
  img.src = `../../..${data["image"]}`;
  main.appendChild(img);

  const text = document.createElement("h3");
  text.innerHTML = data["name"];
  main.appendChild(text);

  if (flag) {
    main.addEventListener("click", () => {
      localStorage.setItem("storeid", data["id"]);
      window.open("client-frontend/html/sellerProfile.html", "_self");
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
    "http://localhost/E-Commerce.HippoWare/ecommerce-server/general/stores.php",
    null,
    null
  )
  .then(function (response) {
    for (let i = 0; i < response.data.length || i < 8; i++) {
      constructproduct(response.data[i], stores1, 1);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

const leftAd = document.querySelector("#leftAd");
const rightAd = document.querySelector("#rightAd");
const advertisment = document.querySelector(".advertisment-div img");

leftAd.addEventListener("click", () => {
  let currAd = advertisment.src;
  advertisment.src = "./landingPage/assets/ad1.webp";
});

rightAd.addEventListener("click", () => {
  let currAd = advertisment.src;
  advertisment.src = "./landingPage/assets/ad2.png";
});
