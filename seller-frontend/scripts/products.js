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
    const categoryOptions=document.getElementsByClassName('category-options')
    const customizeCategory=document.getElementById('customize-category')
    const uploadProduct=document.getElementById('uploadproduct-modal')
    const submitUpload= document.getElementById('submit-upload')
    const cancelUpload= document.getElementById('cancel-upload')
    const menu= document.getElementById('menu')
    const menuContents= document.getElementById('menu-contents')
    const menuLogOut= document.getElementById('log-out-menu')
    //display all products
    if (categorySelect.value== 'none'){
        displaybyCategroy('0')
    }
    categorySelect.onchange=(e)=>{
        products.innerHTML=''
        const categorySelected=e.target.value
        displaybyCategroy(categorySelected)
    }
    async function displaybyCategroy(categorySelected){
        let payload = {search:"0",
        category:categorySelected}
        let config = {
            headers: {'Authorization': localStorage.jwt}
        }
        let res =  await axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/products.php',payload,config).then(
            function (response) {
               
                displayProducts(response.data)
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    function displayProducts(response){
        if (response==''){
            console.log('efijweif')
            let productCard = 
            `<div> Sorry no such product exit</div>`
            products.innerHTML+=productCard
        }
        else{
            console.log('aaa')
            for (data of response){
                let productCard = 
                    `<div class="product-card">
                        <img src="../../assets/jacket2.jfif" class="jacket"> 
                        <div class="product-details">
                            <div>Name : ${data.name}</div>
                            <div>Color: ${data.color} </div>
                            <div>Size: ${data.size}</div>
                            <div>Revenue: ${data.revenue}</div>
                            <div>Price: ${data.price}</div>
                            <img src="../../assets/trash.png" class="trash-bin">
                        </div>
                    </div>`
                products.innerHTML+=productCard
            }
            
        }
    }


    //adding a new product
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
        console.log(uploadCategory.value)
        console.log(uploadColor.value)
        if (uploadCategory.value && uploadPrice.value && uploadColor.value && uploadName.value && 
            uploadSize.value && uploadDescription.value &&uploadDiscount.value){
                console.log(uploadCategory.value)
                console.log(uploadColor.value)
                uplaodNewPorduct()
                uploadProduct.style.display="none"
        }
    }
    function uplaodNewPorduct(){
        let payload = {image:"null", 
        category:uploadCategory.value,
        price:uploadPrice.value,
        revenue:uploadRevenue.value,
        name: uploadName.value,
        description: uploadDescription.value,
        color:uploadColor.value,
        size: uploadSize.value
    }
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
        


    // for (let displayedProduct of displayedProducts){
    //     displayedProduct.onclick=(e)=>{
    //         console.log('Here')
    //         if (trashBin.includes(e.target)){
    //             console.log('yessss')
    //         }
    //     }
    // }
    
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
    categories=localStorage.getItem('categories').split(',')
    localStorage.removeItem('categories')
    console.log(localStorage)
   
    for (let category of categories){
        let option=`<option value=${category}>${category}</option>`
        categorySelect.innerHTML+=option
    }

    //adding new categories
    addCategory.onmouseover=()=>{
        dropDownContents.style.display="Block"
    }
    dropDownContents.onmouseleave=()=>{
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

    //logging out
    logOut.onclick=()=>{
        logoutModal.style.display='Block'
        cancelLogout.onclick=()=>{logoutModal.style.display='none'}
        confirmLogout.onclick=()=>{
            window.location.replace("home_page.html")
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

    
    const searchInput= document.getElementById("search-input")
    searchInput.onkeyup=(e)=>{
        if (e.key === "Enter") {
            e.preventDefault();
            products.innerHTML=''
            searchforProduct(searchInput.value)
          }
    }
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
    
    menu.onmouseover=()=>{
        menuContents.style.display='Block'
    }
    menuContents.onmouseleave=()=>{
        menuContents.style.display='none'
    }
    
}
       