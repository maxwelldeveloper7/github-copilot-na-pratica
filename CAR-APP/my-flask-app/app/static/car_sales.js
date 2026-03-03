document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".comprar-btn");

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const row = event.target.closest("tr");
            const marca = row.children[0].textContent;
            const modelo = row.children[1].textContent;

            alert(`O carro ${marca} ${modelo} foi vendido!`);
        });
    });
});