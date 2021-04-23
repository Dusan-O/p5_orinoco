export const formatPrice = price => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price / 100);
};

export const message = (type, message) => {
    const colors = {
        success: '#07b466',
        primary: '#0d6efd',
        info: '#32b4cd',
        warning: '#f5b529',
        danger: '#6c757d'
    };

    Toastify({
        text: message,
        duration: 4000,
        newWindow: true,
        close: true,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: colors[type]
        },
        stopOnFocus: true,
    }).showToast();
};