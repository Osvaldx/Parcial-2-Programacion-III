let itemsCart = document.getElementById("items-cart")
let cart = JSON.parse(sessionStorage.getItem("cart")) || []
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

const showQuantity = () => {
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
                sessionStorage.setItem("cart", JSON.stringify(cart));
                showCart();
            }
        });
        
        // Evento botón +
        let plusBtn = block.querySelector('.plus');
        plusBtn.addEventListener('click', () => {
            product.quantity++;
            sessionStorage.setItem("cart", JSON.stringify(cart));
            showCart();
        });
    })
    showTotal()    
}

const clearCart = () => {
    sessionStorage.removeItem("cart")
    cart = []
    showCart()
}

const showTotal = () => {
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
    const btnConfirmPurchase = document.getElementById("confirmPurchase");
    btnConfirmPurchase.addEventListener("click", cartConfirm);
}

const deleteProduct = (id) => {
    let product = cart.find(product => product.id_product === id)
    let index = cart.indexOf(product) // -> da la posicion exacta del producto

    if (product) {
        cart.splice(index, 1)
        sessionStorage.setItem("cart", JSON.stringify(cart))
        showCart()
        showTotal()
    }
}

const cartConfirm = () => {
    if(cart.length == 0) {
        alert("TU CARRITO ESTA VACIO")
        return
    }

    const { jsPDF } = window.jspdf;

    // Creamos una nueva instancia del documento PDF usando la clase jsPDF
    const doc = new jsPDF()

    let y = 10;

    doc.setFontSize(14);
    doc.text("TICKET DE COMPRA - SkateSports", 20, y);
    y += 10;
    
    doc.setFontSize(12);

    let totalTicket = 0;
    cart.forEach(product => {
        doc.text(`[NOMBRE]: ${product.nombre} - [CANTIDAD]: ${product.quantity} - [PRECIO x UNIDAD]: $${product.precio}`, 10, y)
        totalTicket += (parseInt(product.precio) * parseInt(product.quantity));
        y+= 10;
    });
    doc.text(`[TOTAL DE LA COMPRA]: $${totalTicket}`, 10, y);

    doc.save("TICKET-COMPRA-SKATESPORT.pdf");
    setTimeout(() => {
        window.location.href = "../../index.html";
    }, 5000);
}

const Init = () => {
    showCart()
    console.log(cart)
}

Init()