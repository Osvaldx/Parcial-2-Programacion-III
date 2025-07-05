// VARIABLES
const ElementFormSearch = document.getElementById("form-deleteProduct");

const deleteProductAPI = async(idProduct) => {
    let response = await fetch(`http://localhost:3000/api/products/delete/${idProduct}`, {
        method: "DELETE",
    })

    return response
}

let showDeleteProduct = async(event) => {
    event.preventDefault();

    let formData = new FormData(event.target); // Lee los datos del form y los devuelve
    let data = Object.fromEntries(formData.entries()); // Convierte el FormData en objeto js

    let response = await deleteProductAPI(data.idProduct)

    if (response.ok) {
        alert("El producto fue eliminado con exito")
    }else{
        alert("ERROR. No se pudo eliminar el producto")
    }
}

ElementFormSearch.addEventListener("submit", showDeleteProduct)
