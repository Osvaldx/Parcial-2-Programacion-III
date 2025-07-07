const ElementFormAdmin = document.querySelector(".box-form");

const createAdmin = (event) => {
    event.preventDefault();

    const form = new Form(event.target);
    const data = Object.entries(form.entries());

}

ElementFormAdmin.addEventListener("submit", createAdmin)