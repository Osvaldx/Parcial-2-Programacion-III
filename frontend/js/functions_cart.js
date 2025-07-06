let itemsCart = document.getElementById("items-cart")
let cart = JSON.parse(localStorage.getItem("cart"))

const showCart = () => {
    let product = ""
    console.log(cart)
    cart.forEach(p => {
        product += `
        <li class="card-cart">
        <div class = "image-box">
            <img src='${p.imagen}' alt="img-product">
        </div>
        <div id= "text-product">
            <p>${p.nombre}</p>
            <p>$${p.precio}</p>
        </div>
        <button><i class="fa-solid fa-trash"></i></button>
        </li>
        `
    })

    itemsCart.innerHTML = product
}


const Init = () => {
    showCart()
}

Init()