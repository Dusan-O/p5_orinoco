// Import formatPrice from index.js
import {formatPrice} from '../functions/index.js';
// Export class ComProductCard
export class ComProductCard extends HTMLDivElement {
    // Constructor(product)
    constructor(product) {
        super();
        const template = document.getElementById('productCardTemplate').innerHTML;
        this.classList = ['col-12 col-md-6 col-xl-4 mb-4'];
        this.innerHTML = template
            .replaceAll('#name#', product.name)
            .replaceAll('#nbModels#', product.lenses.length + (product.lenses.length > 1 ? ' modèles' : ' modèle')) // Opérateur ternaire (if else condensé)
            .replaceAll('#models#', product.lenses.map(lense => `<li>${lense}</li>`).join(''))
            .replaceAll('#image#', product.imageUrl)
            .replaceAll('#price#', formatPrice(product.price))
            .replaceAll('#id#', product._id);
            
    }
}

// Creates a custom product card
customElements.define('product-card', ComProductCard, {extends: 'div'}); 
