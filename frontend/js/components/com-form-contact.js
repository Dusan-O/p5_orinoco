const template = `
<div class="card">
            <div class="card-header">
                <h3 class="h6 mb-0">Vos coordonnées de livraison</h3>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="firstName">Prénom</label>
                    <input 
                        id="firstName"
                        name="firstName"
                        class="form-control"
                        placeholder="Entrez ici votre prénom..."
                        minlength="2"
                        maxlength="30"
                        type="text"
                        autofocus
                        required
                    >
                    <div id="validationFirstname" class="invalid-feedback">
                        Le prénom saisi est invalide.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="lastName">Nom</label>
                    <input 
                    id="lastName"
                    name="lastName"
                    class="form-control"
                    placeholder="Entrez ici votre nom..."
                    minlength="2"
                    maxlength="30"
                    type="text"
                    required
                    >
                    <div id="validationLastname" class="invalid-feedback">
                        Le nom saisi est invalide.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input 
                    id="email"
                    name="email"
                    class="form-control"
                    placeholder="Entrez ici votre adresse email..."
                    type="email"
                    required
                    >
                    <div id="validationEmail" class="invalid-feedback">
                        L'email saisi est invalide.
                    </div>
                </div>
                
                <hr class="mt-4">

                <div class="mb-3">
                    <label for="address">Adresse</label>
                    <input 
                    id="address"
                    name="address"
                    class="form-control"
                    placeholder="Entrez ici votre adresse..."
                    maxlength="50"
                    type="text"
                    required
                    >
                    <div id="validationAddress" class="invalid-feedback">
                        L'adresse saisie est invalide.
                    </div>
                </div>

                <div class="row">
                    <div class="col-4">
                        <div class="mb-3">
                            <label for="zipCode">Code Postal</label>
                            <input 
                            id="zipCode"
                            name="zipCode"
                            class="form-control"
                            placeholder="Votre code postal..."
                            maxlength="5"
                            type="text"
                            required
                            >
                            <div id="validationZipCode" class="invalid-feedback">
                                Le code postal saisi est invalide.
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="city">Ville</label>
                            <input 
                            id="city"
                            name="city"
                            class="form-control"
                            placeholder="Entrez ici votre ville..."
                            maxlength="50"
                            type="text"
                            required
                            >
                            <div id="validationCity" class="invalid-feedback">
                                La ville saisie est invalide.
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="card-footer text-end">
                <button class="btn btn-outline-success" type="submit">
                    <i class="fas fa-check me-1"></i>
                    Valider
                </button>
            </div>
        </div>
`;

export class ComFormContact extends HTMLDivElement {

    constructor() {
        super();
        this.innerHTML = template;
        this.classList = ['col-12 col-lg-6'];
        this.patterns = {
            firstName: /^((['a-zA-ZÀ-ÖØ-öø-ÿ])+\s?-?)*$/,
            lastName: /^((['a-zA-ZÀ-ÖØ-öø-ÿ])+\s?-?)*$/,
            email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,})$/,
            address: /^([0-9]*[,]?\s?)((['a-zA-ZÀ-ÖØ-öø-ÿ])+\s?-?)+$/,
            zipCode: /^[0-9]{5}$/,
            city: /^((['a-zA-ZÀ-ÖØ-öø-ÿ])+\s?-?)*$/
        };
        this.inputs = this.querySelectorAll('input');
        this
            .querySelector('button')
            .addEventListener('click', e => {
                e.preventDefault();
                this.valid();
            });
    }

    raz() {
        this.inputs.forEach(input => {
            input.classList.remove('is-invalid');
        });
    }

    valid() {
        let valid = true;
        this.raz();
        this.inputs.forEach(input => {
            input.value = input.value.trim()
            if(this.patterns[input.name]) {
                if(!input.value || !this.patterns[input.name].test(input.value)) {
                    input.classList.add('is-invalid')
                    valid = false;
                } 
                if(input.name === 'zipCode' && input.value === '00000'){
                    input.classList.add('is-invalid')
                    valid = false;
                }
            }
        });
        if(valid){
            const contact = {};
            this.inputs.forEach(input => {
                contact[input.name] = input.value;
            });
            const event = new CustomEvent('validate', {detail: contact});
            this.dispatchEvent(event);
        }
    }
}

customElements.define('form-contact', ComFormContact, {extends: 'div'});