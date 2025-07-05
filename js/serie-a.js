class SerieAPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupTableInteractions();
    }

    setupTableInteractions() {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            // Efeito de hover
            row.addEventListener('mouseenter', () => {
                row.classList.add('highlighted');
            });
            row.addEventListener('mouseleave', () => {
                row.classList.remove('highlighted');
            });

            // Click para navegar
            row.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    const link = row.querySelector('a');
                    if (link) {
                        window.location.href = link.href;
                    }
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SerieAPage();
});