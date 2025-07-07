class RecordesPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupCounterAnimations();
        this.setupCardAnimations();
    }

    setupCounterAnimations() {
        const numbers = document.querySelectorAll('.recorde-numero');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });

        numbers.forEach(number => {
            observer.observe(number);
        });
    }

    animateNumber(element) {
        const finalValue = element.textContent.replace(/[^\d.,]/g, '');
        const numericValue = parseFloat(finalValue.replace(',', '.'));
        
        if (isNaN(numericValue)) return;

        const duration = 2000;
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;
            
            if (step >= steps) {
                current = numericValue;
                clearInterval(timer);
            }
            
            // Formatar o número baseado no valor original
            let displayValue;
            if (finalValue.includes('.')) {
                displayValue = current.toFixed(2);
            } else if (numericValue >= 1000) {
                displayValue = Math.floor(current).toLocaleString('pt-BR');
            } else {
                displayValue = Math.floor(current);
            }
            
            element.textContent = displayValue;
        }, duration / steps);
    }

    setupCardAnimations() {
        const cards = document.querySelectorAll('.recorde-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RecordesPage();
});