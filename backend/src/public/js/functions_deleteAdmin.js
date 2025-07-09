import { validateID } from "./parametersValidations.js"

let deleteAdminButtons = document.querySelectorAll(".deleteAdminButton")


const deleteAdminAPI = async(id) => {
    let response = fetch(`http://localhost:3000/api/admin/deleteAccount/${id}`, {
        method: "DELETE"
    })
    
    return response
}

const deleteAdmin = async(event) => {
    const btn = event.target
    let id_admin = btn.dataset.id_admin

    let validate = validateID(id_admin)

    if (validate) {
        let response = await deleteAdminAPI(id_admin)

        if(response.ok){
            alert("ADMIN ELIMINADO CON EXITO")
            window.location.reload(); // -> refresca la pagina
        }else{
            alert("NO SE PUDO ELIMINAR EL ADMIN")
        }
    }else{
        alert("ERROR EN EL SERVIDOR AL ELIMINAR EL ADMIN")
    }

}


deleteAdminButtons.forEach(button => {
    button.addEventListener("click", deleteAdmin)
})