import { dateLoginValidation } from "./validations/inputsAdminValidation.js";

const ElementFormLogin = document.querySelector(".box-inputs");

const login = (event) => {
    event.preventDefault();

    const Form = new FormData(event.target);
    const data = Object.fromEntries(Form.entries());

    let result = dateLoginValidation(data.usuario, data.contraseña);

    if(!result.allow) {
        alert(result.message);
        return
    }
}

ElementFormLogin.addEventListener("submit", login);