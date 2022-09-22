window.onload = () => {
    const categorySelect= document.getElementById("category-select")
    const addCategory= document.getElementById("add-category")
    const addProduct= document.getElementById("add-product")
    const products= document.getElementById("products")

    const productCard = 
    `<div class="product-card">
        <img src="../../assets/jacket2.jfif" class="jacket"> 
        <div class="product-details">
            <div>Product Name</div>
            <div>Colors: black, white, red, blue</div>
            <div>Sizes:S,M,L,XL,XXL</div>
            <div>Revenue:</div>
            <div>Price:</div>
            <img src="../../assets/trash.png" class="trash-bin">
        </div>
    </div>`
    //display 9 products for now
    for(let i=0;i<9;i++){
        products.innerHTML+=productCard
    }
    const displayedProducts=document.getElementsByClassName("product-card")
    const myModal= document.getElementById("deletion-modal")
    const deleteItem= document.getElementById("delete-item")
    const cancelDelete= document.getElementById("cancel-delete")
    const trashBin=document.getElementsByClassName("trash-bin")
    const dropDownContents=document.getElementById('drop')
    console.log(dropDownContents)
    for (let i=0; i<displayedProducts.length;i++){
        trashBin[i].onclick=()=>{
            myModal.style.display='Block'
            deleteItem.onclick=()=>{
                displayedProducts[i].remove()
                myModal.style.display='none'
                // products.innerHTML='' 
            }    
        }
        cancelDelete.onclick=()=>{
            myModal.style.display='none'
        }
    }
    let categoryOptions= document.getElementById('category-select')
    let categoryArray=[]
    for (let option of categoryOptions.children){
        categoryArray.push(option.value)
    }
    console.log(categoryArray)
    addCategory.onmouseover=()=>{
        document.getElementById('drop').style.display="Block"
        dropDownContents.onclick=(e)=>{
            console.log(e.target.innerHTML)
            if (categoryArray.includes(e.target.innerHTML) ){
                window.alert('Category already exits')
            }
            else{
                let option=`<option>${e.target.innerHTML}</option>`
                categoryOptions.innerHTML+=option
            }
        }
        document.getElementById('drop').onmouseleave=()=>{
            document.getElementById('drop').style.display="none"
        }
    }

    addProduct.onclick=()=>{  }


    const logOut=document.getElementById('log-out')
    const logoutModal=document.getElementById('logout-modal')
    const cancelLogout=document.getElementById("cancel-logout")
    const confirmLogout=document.getElementById("confirm-logout")
    logOut.onclick=()=>{
        logoutModal.style.display='Block'
        cancelLogout.onclick=()=>{logoutModal.style.display='none'}
        confirmLogout.onclick=()=>{
            window.location.replace("home_page.html")
            localStorage.clear()
        }
    }
    

}
       