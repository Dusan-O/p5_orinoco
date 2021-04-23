import {formatPrice, message} from "../functions/index.js";

const template = `
    <ul class="list-group"></ul>
    <p class="text-end mb-1 mt-4">Vous avez sélectionné : <strong class="nbArticles"></strong></p>
    <p class="text-end">Pour un montant total de : <strong class="price"></strong></p>
`;

const itemTemplate = `
  <div class="row align-items-center">
      <div class="col-2">
          <img class="img-fluid" src="#image#" alt="#name#">
      </div>
      <div class="col-4">#name#</div>
      <div class="col-4 text-end">#price#</div>
      <div class="col-2 text-end">
          <button class="btn btn-sm btn-outline-danger">
              <i class="fas fa-trash"></i>
          </button>
      </div>
  </div>
`;

export class ComBasketList extends HTMLDivElement {

    constructor(basket) {
        super();
        this.basket = basket;
        this.classList = ['col-12 col-lg-6 mb-4'];
        this.innerHTML = template;
        this.nbArticles = this.querySelector('.nbArticles');
        this.price = this.querySelector('.price');
        this.update();
    }

    update() {
        const list = this.querySelector('.list-group');
        list.innerHTML = '';
        let index = 0;

        this.basket.articles.forEach(product => {
            const item = document.createElement('li');
            item.classList.add('list-group-item');
            item.dataset.index = index;
            item.innerHTML = itemTemplate
                .replaceAll('#name#', product.name)
                .replaceAll('#image#', product.imageUrl)
                .replaceAll('#price#', formatPrice(product.price));

            item
                .querySelector('.btn')
                .addEventListener('click', () => {
                    const event = new CustomEvent('delete', { detail: item.dataset.index });
                    this.dispatchEvent(event);
                    message('warning', 'L\'article a été retiré de votre panier avec succès.');
                    this.update();
                });
            list.appendChild(item);
            index++;
        });
        this.nbArticles.innerText = this.basket.articles.length + ' article';
        this.nbArticles.innerText += this.basket.articles.length > 1 ? 's' : '';
        this.price.innerText = formatPrice(this.basket.totalAmount);
    }
}

customElements.define('com-basket-list', ComBasketList, { extends: 'div' });