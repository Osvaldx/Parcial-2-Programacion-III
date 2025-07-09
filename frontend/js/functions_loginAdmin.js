import { dateLoginValidation } from "./validations/inputsAdminValidation.js";

const ElementFormLogin = document.querySelector(".box-inputs");

const sendDataAPI = async(data) => {
    let response = await fetch("http://localhost:3000/api/admin/checkAdmin", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(data)
    })

    let json = await response.json();
    return json
}

const login = async(event) => {
    event.preventDefault();

    const Form = new FormData(event.target);
    const data = Object.fromEntries(Form.entries());

    let result = dateLoginValidation(data.usuario, data.contraseña);

    if(!result.allow) {
        alert(result.message);
        return
    }
    let credentials = {
        "nombre": data.usuario,
        "contraseña": data.contraseña
    }
    
    let json = await sendDataAPI(credentials);
    if(!json.exitsAccount) {
        alert("[!] No existe un usuario con esas credenciales")
        return
    }

    window.location.replace("http://localhost:3000/dashboard")
}

ElementFormLogin.addEventListener("submit", login);