// Add const template to the HTML
const template = `
<div class="alert alert-warning text-center mb-4" role="alert">
    Il n'y a aucun produit dans votre panier pour le moment.
</div>
<p class="text-center">
    <a href="index.html">Retrouvez notre meilleure sélection de produits</a>
</p>
`;
// Export class ComAlertProducts
export class ComAlertNoProducts extends HTMLDivElement {

    constructor() {
        super();
        this.classList = ['col-12 d-none no-product mb-5'];
        this.innerHTML = template;
    }
    // Function show()
    show() {
        this.classList.remove('d-none');
    }
    // Function (hide)
    hide() {
        this.classList.add('d-none');
    }
}

customElements.define('alert-no-product', ComAlertNoProducts, {extends: 'div'});