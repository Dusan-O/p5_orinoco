// Import files
import { Basket } from './classes/basket.class.js';
import {formatPrice, message} from './functions/index.js';
import { ComBubbleNbArticles } from './components/com-bubble-nb-articles.js';

// DomContentLoaded + Fetch
window.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);

    fetch(`http://localhost:3000/api/cameras/${urlParams.get('given_id')}`)
        .then(data => data.json())
        .then(product => { 

            const app = document.getElementById('app');
            const template = document.getElementById('productTemplate').innerHTML;
            // .replaceAll in the HTML
            app.innerHTML = template
                .replaceAll('#name#', product.name)
                .replaceAll('#description#', product.description)
                .replaceAll('#image#', product.imageUrl)
                .replaceAll('#price#', formatPrice(product.price))
                .replaceAll('#id#', product._id)
                .replaceAll('#models#', product.lenses.map(lense => `<option value="${lense}">${lense}</option>`).join(''));
            // Function load()
            const basket = new Basket();
            basket.load();
            // Update the bubbleNbArticles
            const bubbleNbArticles = new ComBubbleNbArticles();
            bubbleNbArticles.update(basket.articles.length);
            // querySelector and addEventListener then function update() for the bubble + message success
            app
                .querySelector('.btn')
                .addEventListener('click', () => {
                    basket.addArticle(product);
                    bubbleNbArticles.update(basket.articles.length);
                    message('success', 'Votre article a bien été ajouté au panier.');
                });
        })
        // .catch error with alert
        .catch(function(error) {
            alert('Une erreur est survenue !');
        });
});