// Import files
import {Basket} from './classes/basket.class.js';
import {formatPrice} from './functions/index.js';

// DomContentLoaded 
window.addEventListener('DOMContentLoaded', () => {
    // New basket + load()
    const basket = new Basket();
    basket.load();
    // Recuperation .getItem 'contact' + 'orderId'
    let contact = localStorage.getItem('contact');
    const orderId = localStorage.getItem('orderId');
    // Condition if no contact then redirection
    if (!contact) {
        window.location = 'index.html';
    }

    contact = JSON.parse(contact);
    // let address for the confirmation
    let address = contact.firstName + ' ' + contact.lastName + '<br>';
    address += contact.address + '<br>';
    address += contact.zipCode + ' ' + contact.city;
    // .getelementByAd for the articles
    document.getElementById('order').innerText = orderId;
    document.getElementById('nbArticles').innerText = basket.articles.length;
    document.getElementById('price').innerText = formatPrice(basket.totalAmount);
    document.getElementById('address').innerHTML = address;
    // functions init() & save()
    basket.init();
    basket.save();
    // RemoveItem from the localStorage for 'contact' and 'orderId'
    localStorage.removeItem('contact');
    localStorage.removeItem('orderId');
});