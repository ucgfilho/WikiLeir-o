class IdolosPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupImageLoading();
    }

    setupImageLoading() {
        const images = document.querySelectorAll('.idolo-image img');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
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
    new IdolosPage();
});