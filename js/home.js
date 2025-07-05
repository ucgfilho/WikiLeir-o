class HomePage {
    constructor() {
        this.init();
    }

    init() {
        this.setupCounter();
    }

    // Função para o contador de estatísticas
    setupCounter() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // A velocidade pode ser ajustada

        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-count');
                const data = +counter.innerText;

                const time = value / speed;
                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = value;
                }
            }
            animate();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
});