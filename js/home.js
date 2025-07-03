// WikiLeirão - Home Page JavaScript
class HomePage {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeroAnimations();
        this.setupCounterAnimations();
        this.setupScrollEffects();
        this.setupInteractiveElements();
        this.setupLazyLoading();
    }

    // Animações específicas da hero section
    setupHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero-text, .hero-image');
        
        // Animação de entrada sequencial
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Efeito de flutuação na imagem
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            this.setupFloatingAnimation(heroImage);
        }
    }

    setupFloatingAnimation(element) {
        let start = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            const yOffset = Math.sin(progress * 0.002) * 10;
            element.style.transform = `translateY(${yOffset}px)`;
            
            requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
    }

    // Animações dos contadores
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Efeitos de scroll
    setupScrollEffects() {
        const sections = document.querySelectorAll('.features-section, .stats-section, .cta-section');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateStaggerItems(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        sections.forEach(section => {
            scrollObserver.observe(section);
        });
    }

    animateStaggerItems(container) {
        const staggerItems = container.querySelectorAll('.stagger-item');
        
        staggerItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Elementos interativos
    setupInteractiveElements() {
        // Hover effects nos cards
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            });
        });

        // Efeito ripple nos botões
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', this.createRippleEffect);
        });
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Lazy loading para imagens
    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Método para smooth scroll
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
});

// Exportar para uso global se necessário
if (typeof window !== 'undefined') {
    window.HomePage = HomePage;
}