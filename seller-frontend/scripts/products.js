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
    const myModal= document.getElementById("myModal")
    const deleteItem= document.getElementById("delete-item")
    const cancelDelete= document.getElementById("cancel-delete")
    const trashBin=document.getElementsByClassName("trash-bin")

    for (let i=0; i<displayedProducts.length;i++){
        trashBin[i].onclick=(e)=>{
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
}