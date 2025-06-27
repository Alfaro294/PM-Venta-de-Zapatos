'use strict';

let API_URL = 'https://retoolapi.dev/WWUwen/data';

document.addEventListener('DOMContentLoaded', () => {
    loadData()
})

let loadData = async () => {
    try {
        let response = await fetch(API_URL);
        let data = await response.json()
        insertData(data);
    } catch (error) {
        
    }
}

let insertData = (shoes) => {
    try {
        let bodyContent = document.querySelector('.contentSection');
        bodyContent.innerHTML = "";
        let fragment = document.createDocumentFragment();

        shoes.forEach((data) => {
            let card = document.createElement('div');
            let containerImageCard = document.createElement('div');
            let bodyCard = document.createElement('div');
            let infoContainerCard = document.createElement('div');
            let btnAddContainer = document.createElement('div');
            let brandShoe = document.createElement('span');
            let modelShoe = document.createElement('span');
            let priceShoe = document.createElement('span');
            let btnAddShoe = document.createElement('button');
            let imgShoe = document.createElement('img');
    
            card.classList.add('card');
    
            containerImageCard.classList.add('containerImageCard');
    
            bodyCard.classList.add('bodyCard');
    
            infoContainerCard.classList.add('infoContainerCard');
    
            btnAddContainer.classList.add('btnAddContainer');
    
            brandShoe.classList.add('brandShoe');
            brandShoe.textContent = data.marca;
    
            modelShoe.classList.add('modelShoe');
            modelShoe.textContent = data.productos;
    
            priceShoe.classList.add('priceShoe');
            priceShoe.textContent = data.precio;
    
            btnAddShoe.classList.add('btnAddShoe');
            btnAddShoe.textContent = "Añadir";
    
            imgShoe.setAttribute('src', data.imagen);
            imgShoe.classList.add('imgShoe');
    
    
            btnAddContainer.appendChild(btnAddShoe);
    
            infoContainerCard.appendChild(brandShoe);
            infoContainerCard.appendChild(modelShoe);
            infoContainerCard.appendChild(priceShoe);
    
            bodyCard.appendChild(infoContainerCard);
            bodyCard.appendChild(btnAddContainer);
    
            containerImageCard.appendChild(imgShoe);
    
            card.appendChild(containerImageCard);
            card.appendChild(bodyCard);

            fragment.appendChild(card);
        });

        bodyContent.appendChild(fragment)
       
    } catch (error) {
        
    }
}