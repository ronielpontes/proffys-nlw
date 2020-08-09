//Procurar o botão
//quando clicar no botão
//executar uma ação
    //duplicar os campos
    //colocar na página

document.querySelector('#add-time').addEventListener('click', cloneField);

function cloneField() {
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);
    const fields = newFieldContainer.querySelectorAll('input');

    fields.forEach(function(field){
        field.value = "";
    });
    
    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}