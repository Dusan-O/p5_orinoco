// Export class ComBubbleNbArrticles
export class ComBubbleNbArticles extends HTMLSpanElement {

    constructor() {
        super();
        this.classList = ['bubble-nb-articles d-none'];
        document
            .querySelector('#navbarMain .nav-link[href="basket.html"]')
            .appendChild(this);
    }
    // Function update the number
    update(number) {
        if (number === 0) {
            this.classList.add('d-none');
        } else {
            this.classList.remove('d-none');
        }
        this.innerText = number;
    }
} 

customElements.define('bubble-nb-articles', ComBubbleNbArticles, {extends: 'span'});