class HistoriaPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupTimelineAnimations();
        this.setupScrollProgress();
    }

    setupTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => {
            observer.observe(item);
        });

        // Adicionar CSS para animações
        const style = document.createElement('style');
        style.textContent = `
            .timeline-item {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.6s ease;
            }
            
            .timeline-item.animate-in {
                opacity: 1;
                transform: translateX(0);
            }
            
            .timeline-year {
                transform: scale(0);
                transition: transform 0.4s ease 0.2s;
            }
            
            .timeline-item.animate-in .timeline-year {
                transform: scale(1);
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollProgress() {
        const timeline = document.querySelector('.timeline-container');
        const progressBar = document.createElement('div');
        
        progressBar.style.cssText = `
            position: absolute;
            left: ${timeline.offsetLeft + 16}px;
            top: 0;
            width: 3px;
            background: rgba(199, 255, 0, 0.3);
            border-radius: 2px;
            transform-origin: top;
            transform: scaleY(0);
            transition: transform 0.1s ease;
        `;
        
        timeline.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const timelineRect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
                const progress = Math.min(1, Math.max(0, 
                    (windowHeight - timelineRect.top) / (windowHeight + timelineRect.height)
                ));
                
                progressBar.style.transform = `scaleY(${progress})`;
                progressBar.style.height = `${timelineRect.height}px`;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HistoriaPage();
});