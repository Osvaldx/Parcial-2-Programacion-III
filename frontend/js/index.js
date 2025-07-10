const clearCart = () => {
    sessionStorage.removeItem("cart")
}

const changeColorInput = (input) => {
    input.style.color = "#cc4343";
    input.style.borderBlockColor = "#cc4343";
    setTimeout(() => {
        input.style.color = "white";
        input.style.borderBlockColor = "rgb(107, 107, 107)";
    }, 2000);
}

function nameValidate() {
    let input = document.getElementById("name-input");
    let nameInput = input.value;
    const regexName = new RegExp("^[a-zA-Z\\s]+$")
    
    if (nameInput.length < 3) {
        changeColorInput(input);
        return
    }
    
    if (nameInput == "" || !regexName.test(nameInput)) { //.test devuelve true o false según si el texto coincide con la RegEx.
        changeColorInput(input);
        return
    }
    
    sessionStorage.setItem("username", nameInput);
    window.location.href = "pages/client/products.html";
}

clearCart();