export class Basket {

    constructor() {
        this.init();
    }

    init() {
        this.articles = [];
        this.totalAmount = 0;
    }

    addArticle(product) {
        this.articles.push(product);
        this.totalAmount += product.price;
        this.save();
    }

    removeArticle(index) {
        const selectedProduct = this.articles[index];
        this.totalAmount -= selectedProduct.price;
        this.articles.splice(index, 1);
        this.save();
    }

    load() {
        let storage = localStorage.getItem('basket');
        if (storage) {
            storage = JSON.parse(storage);
            storage.forEach(product => this.addArticle(product));
        }
    }

    save() {
        localStorage.setItem('basket', JSON.stringify(this.articles));
    }
}