let config = {
  headers: { 'Authorization': localStorage.getItem('jwt') }
}
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// filling pie chart
let pie = new Array()
const fillArr = (x,y) =>{
  pie.push([x,y])
}
axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/top-viewed.php',null, config).then(
function (response) {
  for(const code of response.data){
    fillArr(code['name'],parseInt(code['views']))
  } 
})
.catch(function (error) {
  console.log(error);
})
console.log(pie)

//filling revenue chart

let arr2 = new Array()
arr2.push(["Sales", "Time"])
const fillArr2 = (y,x) => {
  arr2.push([x,y])
}


let startDate = ""
let endDate = ""
let today = new Date()
let todaycopy = new Date()
let todaycopy2 = new Date()
for (let i = 0; i < 84; i = i + 7) {
  todaycopy.setDate(today.getDate() - i)
  todaycopy2.setDate(today.getDate() - i + 7)
  startDate = todaycopy.getFullYear().toString() + "-" + todaycopy.getMonth().toString() + "-" + todaycopy.getDate().toString()
  endDate = todaycopy2.getFullYear().toString() + "-" + todaycopy2.getMonth().toString() + "-" + todaycopy2.getDate().toString()
  
  let payload = {
    startdate: startDate, enddate: endDate
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/profit.php', payload , config).then(
    function (response) {
      if(response.data[0]['profit']){
      fillArr2(parseFloat(response.data[0]['profit']), payload.startdate)}
    })
    .catch(function (error) {
      console.log(error);
    })
}
today = new Date()
todaycopy = new Date()
todaycopy2 = new Date()
let arr3 = new Array()
arr3.push(["Sales", "Time"])
const fillArr3 = (y,x) => {
  arr3.push([x,y])
}
for (let i = 0; i < 12; i++) {
  todaycopy.setMonth(today.getMonth() - i)
  todaycopy2.setMonth(today.getMonth() - i + 1)
  startDate = todaycopy.getFullYear().toString() + "-" + todaycopy.getMonth().toString() + "-" + todaycopy.getDate().toString()
  endDate = todaycopy2.getFullYear().toString() + "-" + todaycopy2.getMonth().toString() + "-" + todaycopy2.getDate().toString()
  console.log(startDate + " " + endDate)
  let payload = {
    startdate: startDate, enddate: endDate
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/profit.php', payload , config).then(
    function (response) {
      if(response.data[0]['profit']){
      fillArr3(parseFloat(response.data[0]['profit']), payload.startdate)}
    })
    .catch(function (error) {
      console.log(error);
    })
}

today = new Date()
todaycopy = new Date()
todaycopy2 = new Date()
let arr4 = new Array()
arr4.push(["Sales", "Time"])
const fillArr4 = (y,x) => {
  arr4.push([x,y])
}
for (let i = 0; i < 12; i++) {
  todaycopy.setFullYear(today.getFullYear() - i)
  todaycopy2.setFullYear(today.getFullYear() - i + 1)
  startDate = todaycopy.getFullYear().toString() + "-" + todaycopy.getMonth().toString() + "-" + todaycopy.getDate().toString()
  endDate = todaycopy2.getFullYear().toString() + "-" + todaycopy2.getMonth().toString() + "-" + todaycopy2.getDate().toString()
  console.log(startDate + " " + endDate)
  let payload = {
    startdate: startDate, enddate: endDate
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/profit.php', payload , config).then(
    function (response) {
      if(response.data[0]['profit']){
        fillArr4(parseFloat(response.data[0]['profit']), payload.startdate)}
    })
    .catch(function (error) {
      console.log(error);
    })
}

const line_graph = document.querySelector(".product-linegraph");
const revenue = document.querySelector("#rev-week");
const revenueMonthly = document.querySelector("#rev-month");
const revenueYearly = document.querySelector("#rev-year");
revenueMonthly.style.display = "none";
revenueYearly.style.display = "none";

const dateSelector = document.getElementById('revenue-time')
dateSelector.addEventListener('click', () => {
  if(dateSelector.value == "week"){
    revenue.style.display = "block"
    revenueMonthly.style.display = "none";
    revenueYearly.style.display = "none";
  }else if(dateSelector.value == "month"){
    revenue.style.display = "none"
    revenueMonthly.style.display = "block";
    revenueYearly.style.display = "none";
  }else {
    revenue.style.display = "none"
    revenueMonthly.style.display = "none";
    revenueYearly.style.display = "block";
  }
})

// DRAWING THE INFOGRAPHICS
function drawChart() {
// PIECHART

  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");

  data.addRows(pie)

  var piechart_options = {
    title: "Top 5 Items viewd",
    width: window.screen.width < 1100 ? window.screen.width*.95 : window.screen.width*.4,
    height: 340,
    is3D: true,
  };
  var piechart = new google.visualization.PieChart(document.querySelector(".piechart"));
  piechart.draw(data, piechart_options);


// REVENUE LINE GRAPH
  var data = google.visualization.arrayToDataTable(arr2);
  // Set Options
  var options = {
    title: "Revenue",
    hAxis: { title: "date" },
    vAxis: { title: "revenue" },
    legend: "none",
    width: window.screen.width-200,
    height: 250,
  };
  // Draw Chart
  var chart = new google.visualization.AreaChart(revenue);
  chart.draw(data, options);

  var data = google.visualization.arrayToDataTable(arr3);
  // Set Options
  var options = {
    title: "Revenue",
    hAxis: { title: "date" },
    vAxis: { title: "revenue" },
    legend: "none",
    width: window.screen.width-200,
    height: 250,
  };
  // Draw Chart
  var chart = new google.visualization.AreaChart(revenueMonthly);
  chart.draw(data, options);

  var data = google.visualization.arrayToDataTable(arr4);
  // Set Options
  var options = {
    title: "Revenue",
    hAxis: { title: "date" },
    vAxis: { title: "revenue" },
    legend: "none",
    width: window.screen.width-200,
    height: 250,
  };
  // Draw Chart
  var chart = new google.visualization.AreaChart(revenueYearly);
  chart.draw(data, options);

};
// discount-codes table 

const discountModal= document.getElementById('discount-container')
const closeModal=document.getElementById('close_btn')
const discountValue=document.getElementById('value')
const description=document.getElementById('description')
const limit=document.getElementById('limit')
const submitDiscount= document.getElementById('submit-discount')
const addDiscount=document.getElementById('add-discount')

const table = document.getElementById('tbody')

addDiscount.onclick=()=>{
  discountModal.style.display="Block"
}
submitDiscount.onclick=(event)=>{
  event.preventDefault()
  if(discountValue.value && description.value && limit.value){
    createNewDiscount(discountValue.value,description.value,limit.value)
  }
}
closeModal.onclick=()=>{
  discountModal.style.display="none"
}

function createNewDiscount(val,des,lim){
  let payload = {
    discount: val,
    description: des,
    limit:lim
  }
  let config = {
    headers: { 'Authorization': localStorage.getItem('jwt') }
  }
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/create-discount-code.php', payload, config).then(
    function (response) {
      console.log(response.data)
      discountModal.style.display="none"
    })
    .catch(function (error) {
      console.log(error);
    })
}

const addDisc = (code) => {
  const row = document.createElement('tr')

  let col = document.createElement('td')
  col.innerHTML = code['id']
  row.appendChild(col)

  col = document.createElement('td')
  col.innerHTML = code['limits']
  row.appendChild(col)

  col = document.createElement('td')
  col.innerHTML = code['discount']
  row.appendChild(col)

  let del = document.createElement('i')
  del.classList.add('material-icons')
  del.innerHTML = "delete"
  del.style.cursor ="pointer"
  row.appendChild(del)

  del.addEventListener('click', () => {
    let payload = {
      discount: code['id']
    }
    let config = {
      headers: { 'Authorization': localStorage.getItem('jwt') }
    }
    axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/delete-discount-code.php', payload, config).then(
      function (response) {
        if(response) table.removeChild(row)
      })
      .catch(function (error) {
        console.log(error);
      })
  })

  table.append(row)

}

axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/discount-codes.php',null, config).then(
  function (response) {
    console.log(response.data)
    if (response.data){
    for(const code of response.data){
      addDisc(code)
    }
  } 
  })
  .catch(function (error) {
    console.log(error);
  })

/*********************Log out******************* */
const logOut=document.getElementById('log-out')
    const logoutModal=document.getElementById('logout-modal')
    const cancelLogout=document.getElementById("cancel-logout")
    const confirmLogout=document.getElementById("confirm-logout")
    
    logOut.onclick=()=>{
        logoutModal.style.display='Block'
        cancelLogout.onclick=()=>{logoutModal.style.display='none'}
        confirmLogout.onclick=()=>{
            window.location.replace("../../index.html")
            localStorage.clear()
        }
  }
/*************store registration*************/

    //store registration
    const storeRegistration= document.getElementById('store-registration');
    const registerStore= document.getElementById('register-store');
    const storeImage= document.getElementById('store-img');
    const storeName= document.getElementById('store-name')
    const storeWelcome= document.getElementById('store-welcome')
    const storeRegisterBtn=document.getElementById('register-store-btn')
    const registerStoreClose=document.getElementById('registerstore_close_btn')
    

    function registeraStore(){
    images=''
    reader = new FileReader();
    reader.addEventListener("load", () => {
    images = reader.result 
    console.log(images)
    localStorage.setItem('store-img',images)
    })
    reader.readAsDataURL(storeImage.files[0]);
    console.log(localStorage.getItem('store-img'))
    let config = {
        headers: {'Authorization': localStorage.jwt}
    }
    let payload = {
        name:storeName.value,
        welc_msg: storeWelcome.value,
        image:localStorage.getItem('store-img')}
    let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/add-store.php',payload,config).then(
        function (response) {
        console.log(response.data);
        // I need this data here ^^
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    }) 
}
    storeRegisterBtn.onclick=()=>{
        storeRegistration.style.display="Block"
    }
    registerStoreClose.onclick=()=>{
        storeRegistration.style.display="none"
    }
    registerStore.onclick=(e)=>{
        e.preventDefault();
        if(storeName.value && storeWelcome.value ){
            console.log('fe')
            registeraStore()
          }
    }



  

