// Import files
import {Basket} from './classes/basket.class.js';
import {ComProductCard} from './components/com-product-card.js';
import {ComBubbleNbArticles} from './components/com-bubble-nb-articles.js';

// DomContentLoaded + Fetch
window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/cameras')
        .then(data => data.json())
        .then(products => {

            const app = document.getElementById('app');
            products.forEach(product => app.appendChild(new ComProductCard(product)));

            const basket = new Basket();
            basket.load();

            const bubbleNbArticles = new ComBubbleNbArticles();
            bubbleNbArticles.update(basket.articles.length);
        })
        // .catch error with alert
        .catch(function(error) {
            alert('Une erreur est survenue !');
            console.error(error);
        });
});