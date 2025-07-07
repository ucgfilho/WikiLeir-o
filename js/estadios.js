class EstadiosPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupImageLoading();
    }

    setupImageLoading() {
        const images = document.querySelectorAll('.estadio-image img');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded'); // Adiciona a classe para tornar a imagem visível
                        observer.unobserve(img); // Para de observar a imagem após carregar
                    }
                });
            }, { threshold: 0.1 });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            images.forEach(img => img.classList.add('loaded'));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EstadiosPage();
});