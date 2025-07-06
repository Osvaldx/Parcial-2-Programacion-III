let itemsCart = document.getElementById("items-cart")
let cart = JSON.parse(localStorage.getItem("cart"))

const showCart = () => {
    let showCartProduct = ""
    console.log(cart)
    for (let i = 0; i < cart.length; i++) {
        let p = cart[i];
        showCartProduct += `
        <li class="card-cart">
        <div class = "image-box">
        <img src='${p.imagen}' alt="img-product">
        </div>
        <div id= "text-product">
        <p>${p.nombre}</p>
        <p>$${(p.precio * p.quantity)}</p>
        </div>
        <div class="quantity-selector">
            <button class="minus">-</button>
            <span class="quantity" data-index= "${i}">${p.quantity}</span>
            <button class="plus">+</button>
        </div>
        <button><i class="fa-solid fa-trash"></i></button>
        </li>
        `
    } 
    
    
    itemsCart.innerHTML = showCartProduct;
    showQuantity()
    

}

let showQuantity = () => {
    let quantitySpan = document.querySelectorAll('.quantity');
    quantitySpan.forEach(span => {
        let index = Number(span.dataset.index);
        let product = cart[index];
        let block = span.closest(".quantity-selector") // -> devuelve el primer elemento padre o el mismo elemento que encaja con el selector

        // Evento botón -
        let minusBtn = block.querySelector('.minus');
        minusBtn.addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity--;
                localStorage.setItem("cart", JSON.stringify(cart));
                showCart();
            }
        });
        
        // Evento botón +
        let plusBtn = block.querySelector('.plus');
        plusBtn.addEventListener('click', () => {
            product.quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            showCart();
        });
    })    
}
    


const Init = () => {
    showCart()
}

Init()