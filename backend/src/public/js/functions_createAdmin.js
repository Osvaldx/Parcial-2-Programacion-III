import parameters from "/js/adminParameterValidations.js";
const ElementFormAdmin = document.querySelector(".box-form");

const createAdminAPI = async(data) => {

    let response = await fetch("http://localhost:3000/api/admin/createAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return response
}


const createAdmin = async(event) => {
    event.preventDefault();

    let form = new FormData(event.target);
    let data = Object.fromEntries(form.entries());
    let result = parameters.parametersValidation(data.correo, data.nombre, data.contraseña)

    if (result.allow) {
        let response = await createAdminAPI(data)

        if (response.ok) {
            alert("Admin creado con exito")
        }else{
            alert("Error en el servidor")
        }

    }else{
        alert(`${result.message}`)
    }
}

ElementFormAdmin.addEventListener("submit", createAdmin)