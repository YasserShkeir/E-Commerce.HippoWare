window.onload = () => {
    console.log(localStorage)
    const categorySelect= document.getElementById("category-select")
    const addCategory= document.getElementById("add-category")
    const addProduct= document.getElementById("add-product")
    const products= document.getElementById("products")
    const displayedProducts=document.getElementsByClassName("product-card")
    const deleteModal= document.getElementById("deletion-modal")
    const deleteItem= document.getElementById("delete-item")
    const cancelDelete= document.getElementById("cancel-delete")
    const trashBin = document.getElementsByClassName("trash-bin")
    const logOut=document.getElementById('log-out')
    const logoutModal=document.getElementById('logout-modal')
    const cancelLogout=document.getElementById("cancel-logout")
    const confirmLogout=document.getElementById("confirm-logout")
    const dropDownContents=document.getElementById('drop')
    const dropDown= document.getElementById('dropdown')
    const categoryOptions=document.getElementsByClassName('category-options')
    const customizeCategory=document.getElementById('customize-category')
    const uploadProduct=document.getElementById('uploadproduct-modal')
    const submitUpload= document.getElementById('submit-upload')
    const cancelUpload= document.getElementById('cancel-upload')
    const menu= document.getElementById('menu')
    const menuContents= document.getElementById('menu-contents')
    const menuLogOut= document.getElementById('log-out-menu')
    const hamburgerMenu= document.getElementById('hamburger-menu')
    const searchInput= document.getElementById("search-input")
    const uploadImage=document.getElementById("upload-image")
    //store registration
    const storeRegistration= document.getElementById('store-registration');
    const registerStore= document.getElementById('register-store');
    const storeImage= document.getElementById('store-img');
    const storeName= document.getElementById('store-name')
    const storeWelcome= document.getElementById('store-welcome')
    const storeRegisterBtn=document.getElementById('register-store-btn')
    const registerStoreClose=document.getElementById('registerstore_close_btn')
    
    
    /*************display and delete products*************/
    //all categories displayed
    if (categorySelect.value== 'none'){
        displaybyCategroy('0')
    }
    //selection of a category
    categorySelect.onchange=(e)=>{
        products.innerHTML=''
        const categorySelected=e.target.value
        displaybyCategroy(categorySelected)
    }
    //display according to category
    function displaybyCategroy(categorySelected){
        let payload = {search:"0",
        category:categorySelected}
        let config = {
            headers: {'Authorization': localStorage.jwt}
        }
        let res =  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/products.php',payload,config).then(
            function (response) {
                console.log(response.data)
                for (let data of response.data){
                    displayProducts(data)}
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //helper function to display products
    function displayProducts(data){
        if (data==''){
            let productCard = 
            `<div> No product exits</div>`
            products.innerHTML+=productCard
        }
        else{
            let productCard= document.createElement('div')
            productCard.classList.add("product-card")
            let prodImage=document.createElement('img')
            prodImage.classList.add("jacket")
            prodImage.src=`../../../../..${data.image}`
            let prodDetails=document.createElement('div')
            prodDetails.classList.add("product-details")
            let prodName=document.createElement('div')
            prodName.innerHTML=`Name : ${data.name}`
            let prodColor= document.createElement('div')
            prodColor.innerHTML=`Color: ${data.color}`
            let prodSize= document.createElement('div')
            prodSize.innerHTML=`Size: ${data.size}`
            let prodRevenue= document.createElement('div')
            prodRevenue.innerHTML=`Revenue: ${data.revenue}`
            let prodPrice=document.createElement('div')
            prodPrice.innerHTML=`Price: ${data.price}`
            let trash=document.createElement('img')
            trash.classList.add("trash-bin")
            trash.src="../assets/trash.png"
            prodDetails.appendChild(prodName)
            prodDetails.appendChild(prodColor)
            prodDetails.appendChild(prodSize)
            prodDetails.appendChild(prodRevenue)
            prodDetails.appendChild(prodPrice)
            prodDetails.appendChild(trash)
            productCard.appendChild(prodImage)
            productCard.appendChild(prodDetails)
            products.appendChild(productCard)
            trash.addEventListener('click', () => {
                deleteModal.style.display="Block"
                deleteProduct(data.id)
               
            })
        }
    }
    //delete a product
    function deleteProduct(id){
        deleteItem.onclick=()=>{
            let payload = {
                product: id
            }
            let config = {
                headers: { 'Authorization': localStorage.getItem('jwt') }
            }
            axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/delete-product.php', payload, config).then(
            function (response) {
            if(response) 
                deleteModal.style.display="None"
                products.removeChild(productCard)
            })
            .catch(function (error) {
            console.log(error);
            })
        }
        cancelDelete.onclick=()=>{
            deleteModal.style.display="None"
        }
    }

    /*************add a new product*************/
    const uploadCategory=document.getElementById('upload-category')
    const uploadPrice=document.getElementById('upload-price')
    const uploadDiscount=document.getElementById('upload-discount')
    const uploadName=document.getElementById('upload-name')
    const uploadColor=document.getElementById('upload-color')
    const uploadSize=document.getElementById('upload-size')
    const uploadDescription=document.getElementById('upload-description')
    const uploadRevenue=document.getElementById('upload-revenue')

    addProduct.onclick=()=>{
        uploadProduct.style.display="Block"
    }
    cancelUpload.onclick=()=>{
        uploadProduct.style.display="none"
    }
    submitUpload.onclick=(e)=>{
        e.preventDefault()
        
        if (uploadCategory.value && uploadPrice.value && uploadColor.value && uploadName.value && 
            uploadSize.value && uploadDescription.value &&uploadDiscount.value){
                uplaodNewPorduct()
                uploadProduct.style.display="none"
    
        }
    }
    //convert image into base 64
    let images=''
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        images = reader.result 
        console.log(images)
        localStorage.setItem('img',images)
    })
    console.log(localStorage.getItem('img'))
    //upload new product
    function uplaodNewPorduct(){
        reader.readAsDataURL(document.getElementById('file').files[0]);
        console.log(localStorage.getItem('img'))
        let payload = {image:localStorage.getItem('img'), 
        category:uploadCategory.value,
        price:uploadPrice.value,
        revenue:uploadRevenue.value,
        name: uploadName.value,
        description: uploadDescription.value,
        color:uploadColor.value,
        size: uploadSize.value}
        localStorage.removeItem('img')
        let config = {
            headers: {'Authorization': localStorage.jwt}
        }
        let res =  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/add-product.php',payload,config).then(
            function (response) {
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })
    }   

    /*************stornig and creating categories*************/

    //Storing Categories in category options
    let categories=[]
    payload = {}
    config = {
        headers: {'Authorization': localStorage.jwt}
    };
    res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/categories.php',payload,config).then(
        function (response) {
        categories=[]
        for (let i=0;i<response.data.length;i++){
            categories.push(response.data[i].name)
        }
        if ('categories' in localStorage){
            console.log(localStorage)
            localStorage.removeItem('categories')
        }

        localStorage.setItem('categories',categories.toString())
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    })

    if('categories' in localStorage){
        categories=localStorage.getItem('categories').split(',')
        localStorage.removeItem('categories')
        console.log(localStorage)
    }
   
    for (let category of categories){
        let option=`<option value=${category}>${category}</option>`
        categorySelect.innerHTML+=option
    }
   
    //adding new categories
    addCategory.onmouseover=()=>{
        dropDownContents.style.display="Block"
    }
    dropDown.onmouseleave=()=>{
        dropDownContents.style.display="none"
    }

    let categoryArray=['Men','Women','Children']
    dropDownContents.onclick=(e)=>{
        let clickedCategory=e.target.innerHTML
        console.log(clickedCategory)
        if (categoryArray.includes(clickedCategory)){
            let payload = {category: clickedCategory }
            let config = {
                headers: {'Authorization': localStorage.jwt}
            };
            let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/add-category.php',payload, config).then(
                function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
    customizeCategory.onkeyup=(e)=>{
        if (e.key==='Enter'){
            console.log(customizeCategory.value)
            let payload = {category: customizeCategory.value }
            let config = {
                headers: {'Authorization': localStorage.jwt}
            };
            let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/add-category.php',payload, config).then(
                function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
    
    /*************log out*************/

    //logging out
    logOut.onclick=()=>{
        logoutModal.style.display='Block'
        cancelLogout.onclick=()=>{logoutModal.style.display='none'}
        confirmLogout.onclick=()=>{
            window.location.replace("../../index.html")
            localStorage.clear()
        }
    }

    menuLogOut.onclick=()=>{
        logoutModal.style.display='Block'
        cancelLogout.onclick=()=>{logoutModal.style.display='none'}
        confirmLogout.onclick=()=>{
            window.location.replace("home_page.html")
            localStorage.clear()
        }
    }
    

    /*************searching for product by name*************/

    //search products
    searchInput.onkeyup=(e)=>{
        if (e.key === "Enter") {
            e.preventDefault();
            products.innerHTML=''
            searchforProduct(searchInput.value)
          }
    }
    //helper function to display searched product
    function searchforProduct(productName){
        let payload = {search: productName,
        category:'0'}
        let config = {
            headers: {'Authorization': localStorage.jwt}
        }
        let res =  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/products.php',payload,config).then(
            function (response) {
                console.log(response.data)
                displayProducts(response.data)
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    

    /*************Hamburger Menu*************/
    hamburgerMenu.onmouseover=()=>{
        menuContents.style.display='Block'
    }
    menuContents.onmouseleave=()=>{
        menuContents.style.display='none'
    }
    
    /*************store registration*************/

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
    
}
       