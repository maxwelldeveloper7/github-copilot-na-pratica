document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    console.log("Botões encontrados:", buttons);

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const carName = button.getAttribute("car") || 'Desconhecido';
            alert(`O carro ${carName} foi vendido!`);
        });
    });
});