import {Basket} from './classes/basket.class.js';
import {formatPrice} from './functions/index.js';

window.addEventListener('DOMContentLoaded', () => {

    const basket = new Basket();
    basket.load();

    let contact = localStorage.getItem('contact');
    const orderId = localStorage.getItem('orderId');

    if (!contact) {
        window.location = 'index.html';
    }

    contact = JSON.parse(contact);

    let address = contact.firstName + ' ' + contact.lastName + '<br>';
    address += contact.address + '<br>';
    address += contact.zipCode + ' ' + contact.city;

    document.getElementById('order').innerText = orderId;
    document.getElementById('nbArticles').innerText = basket.articles.length;
    document.getElementById('price').innerText = formatPrice(basket.totalAmount);
    document.getElementById('address').innerHTML = address;

    basket.init();
    basket.save();
    localStorage.removeItem('contact');
    localStorage.removeItem('orderId');
});