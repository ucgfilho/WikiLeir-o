class CompeticoesPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupFilters();
    }

    setupAnimations() {
        const cards = document.querySelectorAll('.competicao-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    setupFilters() {
        // Funcionalidade para filtrar competições por status
        const statusButtons = document.querySelectorAll('.competicao-status');
        
        statusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const status = button.textContent.toLowerCase();
                this.filterByStatus(status);
            });
        });
    }

    filterByStatus(status) {
        const cards = document.querySelectorAll('.competicao-card');
        
        cards.forEach(card => {
            const cardStatus = card.querySelector('.competicao-status').textContent.toLowerCase();
            
            if (status === 'todas' || cardStatus === status) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CompeticoesPage();
});