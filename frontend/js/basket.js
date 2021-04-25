// Import files
import { Basket } from './classes/basket.class.js';
import { ComBubbleNbArticles } from './components/com-bubble-nb-articles.js';
import { ComAlertNoProducts } from './components/com-alert-no-products.js';
import { ComFormContact } from './components/com-form-contact.js';
import { ComBasketList } from './components/com-basket-list.js';

// DomContentLoaded
window.addEventListener('DOMContentLoaded', () => {

    const basket = new Basket();
    basket.load();

    const bubbleNbArticles = new ComBubbleNbArticles();
    bubbleNbArticles.update(basket.articles.length);

    const app = document.getElementById('app');
    // Update the bubbleNbArticles
    const alertNoProducts = new ComAlertNoProducts();
    app.appendChild(alertNoProducts);
    // If something in the basket
    if (basket.articles.length) {

        const basketList = new ComBasketList(basket);
        basketList.addEventListener('delete', e => {
            basket.removeArticle(e.detail);
            bubbleNbArticles.update(basket.articles.length);
            if (!basket.articles.length) {
                basketList.remove();
                formContact.remove();
                alertNoProducts.show();
            }
        });
        app.appendChild(basketList);

        const formContact = new ComFormContact();
        app.appendChild(formContact);
        // AddEventListener -> Validate then Fetch
        formContact.addEventListener('validate', e => {
            const orderId = Math.floor(Math.random() * 1000000000000);
            fetch(
                "http://localhost:3000/api/cameras/order",
                {
                    method: 'POST',
                    body: JSON.stringify({
                        contact: e.detail,
                        products: basket.articles,
                        order_id: orderId.toString()
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('contact', JSON.stringify(e.detail));
                localStorage.setItem('orderId', orderId);
                setTimeout(function(){
                  window.location = 'confirmation.html';
                }, 500);
            })
            // .catch error with alert
            .catch(function (error) {
                alert('Erreur de communication avec le serveur.');
                console.error(error);
            });
        });
        // If basket is empty function show()
    } else {
        alertNoProducts.show();
    }
});