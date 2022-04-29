let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);


// Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //clona tudo que está dentro do modelo pizza-item incluindo o seu conteúdo
    

    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault(); //Removendo o evento padrão ao clicar no href

        let Pizza = e.target.closest('.pizza-item'); // Pegando o elemento com a classe pizza-item mas próxima deste elemento no caso o 'a' que estamos dentro
        let key = Pizza.getAttribute('data-key'); // guardando o atributo data-key da classe guardada na variavel acima no caso o 'pizza-item' na variavel key
        modalQt = 1;
        modalKey = key;


        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--price').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        c('.pizzaInfo--size.selected').classList.remove('selected');
        
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })

        c('.cart--item--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    });

    c('.pizza-area').append(pizzaItem);

        
    });


// criar uma função de fechar o modal
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

//selecione todas classes pizzaInfo--cancelButton e pizzaInfo--cancelMobileButton e faça um forEach para adicionar o evento de click de fechar o modal
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
} ); 

cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
} );

function updateCart() {
    let qt = 0;
    cart.forEach((item) => {
        qt += item.qt;
    })
    c('.cart span').innerHTML = qt;
} 



c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').querySelector('span').innerHTML);
    let key = c('.pizzaInfo').getAttribute('data-key');
    let pizza = {
        key: key,
        size: size,
        qt: modalQt
    }
    cart.push(pizza);
    updateCart();
    closeModal();
} );