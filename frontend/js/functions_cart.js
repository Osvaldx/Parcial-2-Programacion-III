let itemsCart = document.getElementById("items-cart")
let cart = JSON.parse(localStorage.getItem("cart")) || []
let totalCart = document.getElementById("total-cart")

const showCart = () => {
    let showCartProduct = ""
    if (cart.length === 0) {
        showCartProduct = `<p>Tu carrito esta vacio</p>`
        
    }
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
        <button onclick = deleteProduct(${p.id_product})><i class="fa-solid fa-trash"></i></button>
        </li>
        `
    } 
    
    
    itemsCart.innerHTML = showCartProduct;
    showQuantity()
    showTotal()
    

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
    showTotal()    
}

let clearCart = () => {
    localStorage.removeItem("cart")
    cart = []
    showCart()
}

let showTotal = () => {
    let total = 0
    let view = ""
    cart.forEach(product => {
        total += (product.precio * product.quantity)
    })
    view += `
    <section id = "total">
        <div id = "cart-summary">
            <h3>TOTAL: $${total}</h3>
            <button id="confirmPurchase">Confirmar compra</button>
            </div>
            <div>
            <button onclick = "clearCart()" id="clear">Vaciar carrito</button>
        </div>
    </section>
    `

    totalCart.innerHTML = view;
}

let deleteProduct = (id) => {
    let product = cart.find(product => product.id_product === id)
    let index = cart.indexOf(product) // -> da la posicion exacta del producto

    if (product) {
        cart.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(cart))
        showCart()
        showTotal()
    }
}


const Init = () => {
    showCart()
}

Init()