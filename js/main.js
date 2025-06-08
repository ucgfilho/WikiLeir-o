// WikiLeirão - JavaScript Principal
class WikiLeirao {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupTooltips();
        this.setupSearch();
        this.setupTheme();
        this.setupLazyLoading();
    }

    // Event Listeners
    setupEventListeners() {
        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Menu mobile toggle
        this.setupMobileMenu();

        // Scroll to top
        this.setupScrollToTop();

        // Table interactions
        this.setupTableInteractions();
    }

    // Mobile Menu
    setupMobileMenu() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        // Criar botão do menu mobile
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.setAttribute('aria-label', 'Toggle menu');

        const header = document.querySelector('.container-cabecalho');
        if (header) {
            header.insertBefore(menuButton, nav);
        }

        // Toggle menu
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            menuButton.classList.toggle('active');
            menuButton.innerHTML = nav.classList.contains('nav-open') ? '✕' : '☰';
        });

        // Fechar menu ao clicar em link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
                menuButton.classList.remove('active');
                menuButton.innerHTML = '☰';
            });
        });
    }

    // Scroll to Top
    setupScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '↑';
        scrollButton.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(scrollButton);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animações
    setupAnimations() {
        // Intersection Observer para animações
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        document.querySelectorAll('.secao-time, .item-trofeu, .cabecalho-time').forEach(el => {
            observer.observe(el);
        });

        // Animação de contagem para números
        this.animateNumbers();
    }

    // Animação de números
    animateNumbers() {
        const numbers = document.querySelectorAll('[data-count]');
        numbers.forEach(number => {
            const target = parseInt(number.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Tooltips
    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-info]');
        
        tooltipElements.forEach(element => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.dataset.info;
            document.body.appendChild(tooltip);

            element.addEventListener('mouseenter', (e) => {
                tooltip.style.display = 'block';
                this.positionTooltip(e, tooltip);
            });

            element.addEventListener('mousemove', (e) => {
                this.positionTooltip(e, tooltip);
            });

            element.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        });
    }

    positionTooltip(e, tooltip) {
        const x = e.clientX + 10;
        const y = e.clientY - 10;
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    // Sistema de busca
    setupSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="search-input" placeholder="Buscar time..." />
            <div id="search-results" class="search-results"></div>
        `;

        const header = document.querySelector('header .container');
        if (header) {
            header.appendChild(searchContainer);
        }

        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value, searchResults);
            });

            // Fechar resultados ao clicar fora
            document.addEventListener('click', (e) => {
                if (!searchContainer.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        }
    }

    performSearch(query, resultsContainer) {
        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        // Lista de times (seria melhor vir de uma API ou JSON)
        const teams = this.getTeamsList();
        const filteredTeams = teams.filter(team => 
            team.name.toLowerCase().includes(query.toLowerCase()) ||
            team.nickname.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(filteredTeams, resultsContainer);
    }

    getTeamsList() {
        // Lista simplificada dos times - em produção viria de uma API
        return [
            { name: 'Flamengo', nickname: 'Mengão', url: 'times/Série A/flamengo.html' },
            { name: 'Corinthians', nickname: 'Timão', url: 'times/Série A/corinthians.html' },
            { name: 'Palmeiras', nickname: 'Verdão', url: 'times/Série A/palmeiras.html' },
            { name: 'São Paulo', nickname: 'Tricolor', url: 'times/Série A/sao-paulo.html' },
            { name: 'Santos', nickname: 'Peixe', url: 'times/Série A/santos.html' },
            // Adicionar mais times conforme necessário
        ];
    }

    displaySearchResults(teams, container) {
        if (teams.length === 0) {
            container.innerHTML = '<div class="no-results">Nenhum time encontrado</div>';
        } else {
            container.innerHTML = teams.map(team => `
                <a href="${team.url}" class="search-result-item">
                    <strong>${team.name}</strong>
                    <span>${team.nickname}</span>
                </a>
            `).join('');
        }
        container.style.display = 'block';
    }

<<<<<<< HEAD
=======
    // Sistema de tema
    setupTheme() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('aria-label', 'Alternar tema');

        const header = document.querySelector('.container-cabecalho');
        if (header) {
            header.appendChild(themeToggle);
        }

        // Verificar tema salvo
        const savedTheme = localStorage.getItem('wikileirao-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '☀️';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
            localStorage.setItem('wikileirao-theme', isDark ? 'dark' : 'light');
        });
    }

>>>>>>> 3ff97f2032a451a86a52b47ce185e24f82db2d54
    // Lazy Loading para imagens
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Interações da tabela
    setupTableInteractions() {
        const tables = document.querySelectorAll('table');
        
        tables.forEach(table => {
            // Highlight da linha ao hover
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.addEventListener('mouseenter', () => {
                    row.classList.add('highlighted');
                });
                
                row.addEventListener('mouseleave', () => {
                    row.classList.remove('highlighted');
                });
            });

            // Ordenação de colunas (básica)
            const headers = table.querySelectorAll('th');
            headers.forEach((header, index) => {
                header.addEventListener('click', () => {
                    this.sortTable(table, index);
                });
                header.style.cursor = 'pointer';
            });
        });
    }

    sortTable(table, columnIndex) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        const sortedRows = rows.sort((a, b) => {
            const aText = a.cells[columnIndex].textContent.trim();
            const bText = b.cells[columnIndex].textContent.trim();
            
            // Tentar converter para número
            const aNum = parseFloat(aText);
            const bNum = parseFloat(bText);
            
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return aNum - bNum;
            }
            
            return aText.localeCompare(bText);
        });

        // Remover e readicionar linhas ordenadas
        rows.forEach(row => row.remove());
        sortedRows.forEach(row => tbody.appendChild(row));
    }
}

// Utilitários
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static formatNumber(num) {
        return new Intl.NumberFormat('pt-BR').format(num);
    }

    static isMobile() {
        return window.innerWidth <= 768;
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    startTimer(name) {
        this.metrics[name] = performance.now();
    }

    endTimer(name) {
        if (this.metrics[name]) {
            const duration = performance.now() - this.metrics[name];
            console.log(`${name}: ${duration.toFixed(2)}ms`);
            delete this.metrics[name];
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const perfMonitor = new PerformanceMonitor();
    perfMonitor.startTimer('WikiLeirao Init');
    
    new WikiLeirao();
    
    perfMonitor.endTimer('WikiLeirao Init');
});

// Service Worker para cache (se suportado)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}