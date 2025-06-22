


function nameValidate() {
    let nameInput = document.getElementById("name-input").value
    const regexName = new RegExp("^[a-zA-Z\\s]+$") 
    

    if (nameInput.length < 3) {
        alert("Ingrese un nombre valido")
        return
    }


    if (nameInput === "" || !regexName.test(nameInput)) { //.test devuelve true o false según si el texto coincide con la RegEx.
        alert("Ingrese un nombre valido")
        return
    }

    window.location.href = "pages/client/products.html";
}