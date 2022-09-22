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
        </div>
    </div>`
    for(let i=0;i<6;i++){
        products.innerHTML+=productCard
    }
}