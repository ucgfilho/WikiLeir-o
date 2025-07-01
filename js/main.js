// WikiLeirão - JavaScript Principal
class WikiLeirao {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupTooltips();
        this.setupAdvancedSearch();
        this.setupTheme();
        this.setupLazyLoading();
        this.setupSEOEnhancements();
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
        menuButton.setAttribute('aria-expanded', 'false');

        const header = document.querySelector('.container-cabecalho');
        if (header) {
            header.insertBefore(menuButton, nav);
        }

        // Toggle menu
        menuButton.addEventListener('click', () => {
            const isOpen = nav.classList.contains('nav-open');
            nav.classList.toggle('nav-open');
            menuButton.classList.toggle('active');
            menuButton.innerHTML = nav.classList.contains('nav-open') ? '✕' : '☰';
            menuButton.setAttribute('aria-expanded', !isOpen);
        });

        // Fechar menu ao clicar em link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
                menuButton.classList.remove('active');
                menuButton.innerHTML = '☰';
                menuButton.setAttribute('aria-expanded', 'false');
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
            tooltip.setAttribute('role', 'tooltip');
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

            // Acessibilidade para teclado
            element.addEventListener('focus', (e) => {
                tooltip.style.display = 'block';
                this.positionTooltip(e, tooltip);
            });

            element.addEventListener('blur', () => {
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

    // Sistema de busca avançado
    setupAdvancedSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" 
                   id="search-input" 
                   placeholder="Buscar time..." 
                   autocomplete="off"
                   aria-label="Buscar times do Brasileirão"
                   role="searchbox" />
            <div id="search-results" class="search-results" role="listbox" aria-label="Resultados da busca"></div>
        `;

        const header = document.querySelector('header .container-cabecalho');
        if (header) {
            header.appendChild(searchContainer);
        }

        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        if (searchInput && window.teamsDatabase) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performAdvancedSearch(e.target.value, searchResults);
                }, 150); // Debounce para melhor performance
            });

            // Navegação por teclado
            searchInput.addEventListener('keydown', (e) => {
                this.handleSearchKeyNavigation(e, searchResults);
            });

            // Fechar resultados ao clicar fora
            document.addEventListener('click', (e) => {
                if (!searchContainer.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });

            // Fechar com ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchResults.style.display = 'none';
                    searchInput.blur();
                }
            });
        }
    }

    performAdvancedSearch(query, resultsContainer) {
        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        const normalizedQuery = this.normalizeString(query);
        const results = [];

        // Busca nos dados dos times
        window.teamsDatabase.forEach(team => {
            const score = this.calculateSearchScore(team, normalizedQuery);
            if (score > 0) {
                results.push({ team, score });
            }
        });

        // Ordenar por relevância
        results.sort((a, b) => b.score - a.score);

        // Limitar a 8 resultados
        const topResults = results.slice(0, 8);

        this.displaySearchResults(topResults, resultsContainer, query);
    }

    calculateSearchScore(team, query) {
        let score = 0;
        const queryWords = query.split(' ').filter(word => word.length > 1);

        queryWords.forEach(word => {
            // Nome exato (maior peso)
            if (this.normalizeString(team.name).includes(word)) {
                score += 100;
            }

            // Nome completo
            if (this.normalizeString(team.fullName).includes(word)) {
                score += 80;
            }

            // Apelidos
            team.nickname.forEach(nick => {
                if (this.normalizeString(nick).includes(word)) {
                    score += 70;
                }
            });

            // Cidade
            if (this.normalizeString(team.city).includes(word)) {
                score += 50;
            }

            // Estado
            if (this.normalizeString(team.state).includes(word)) {
                score += 40;
            }

            // Mascote
            if (this.normalizeString(team.mascot).includes(word)) {
                score += 60;
            }

            // Keywords
            team.keywords.forEach(keyword => {
                if (keyword.includes(word)) {
                    score += 30;
                }
            });

            // Estádio
            if (this.normalizeString(team.stadium).includes(word)) {
                score += 25;
            }
        });

        return score;
    }

    normalizeString(str) {
        return str.toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '') // Remove acentos
                  .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais
                  .trim();
    }

    displaySearchResults(results, container, originalQuery) {
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results" role="option">
                    <strong>Nenhum time encontrado</strong>
                    <span>Tente buscar por: nome do time, apelido, cidade ou estado</span>
                </div>
            `;
        } else {
            container.innerHTML = results.map((result, index) => {
                const { team } = result;
                const highlightedName = this.highlightSearchTerm(team.name, originalQuery);
                const highlightedNickname = team.nickname.length > 0 ? 
                    this.highlightSearchTerm(team.nickname[0], originalQuery) : '';
                
                return `
                    <a href="${team.url}" 
                       class="search-result-item" 
                       role="option"
                       tabindex="0"
                       data-index="${index}"
                       aria-label="Ir para página do ${team.name}">
                        <div class="search-result-main">
                            <strong>${highlightedName}</strong>
                            ${highlightedNickname ? `<span class="nickname">${highlightedNickname}</span>` : ''}
                        </div>
                        <div class="search-result-details">
                            <span class="city">${team.city} - ${team.state}</span>
                            <span class="serie">Série ${team.serie}</span>
                        </div>
                    </a>
                `;
            }).join('');
        }
        container.style.display = 'block';
    }

    highlightSearchTerm(text, searchTerm) {
        if (!searchTerm || searchTerm.length < 2) return text;
        
        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    handleSearchKeyNavigation(e, resultsContainer) {
        const results = resultsContainer.querySelectorAll('.search-result-item');
        if (results.length === 0) return;

        let currentIndex = -1;
        const currentSelected = resultsContainer.querySelector('.search-result-item.selected');
        if (currentSelected) {
            currentIndex = parseInt(currentSelected.dataset.index);
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = Math.min(currentIndex + 1, results.length - 1);
                this.selectSearchResult(results, currentIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = Math.max(currentIndex - 1, -1);
                this.selectSearchResult(results, currentIndex);
                break;
            case 'Enter':
                e.preventDefault();
                if (currentIndex >= 0 && results[currentIndex]) {
                    results[currentIndex].click();
                }
                break;
        }
    }

    selectSearchResult(results, index) {
        // Remove seleção anterior
        results.forEach(result => result.classList.remove('selected'));
        
        // Adiciona nova seleção
        if (index >= 0 && results[index]) {
            results[index].classList.add('selected');
            results[index].scrollIntoView({ block: 'nearest' });
        }
    }

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
                header.setAttribute('tabindex', '0');
                header.setAttribute('role', 'button');
                header.setAttribute('aria-label', `Ordenar por ${header.textContent}`);
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
            
            return aText.localeCompare(bText, 'pt-BR');
        });

        // Remover e readicionar linhas ordenadas
        rows.forEach(row => row.remove());
        sortedRows.forEach(row => tbody.appendChild(row));
    }

    // Melhorias de SEO
    setupSEOEnhancements() {
        // Adicionar breadcrumbs dinamicamente
        this.addBreadcrumbs();
        
        // Melhorar meta descriptions dinamicamente
        this.enhanceMetaDescriptions();
        
        // Adicionar dados estruturados para times
        this.addStructuredData();
    }

    addBreadcrumbs() {
        const currentPage = window.location.pathname;
        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.setAttribute('aria-label', 'Breadcrumb');
        breadcrumbContainer.className = 'breadcrumb';
        
        let breadcrumbHTML = '<ol>';
        breadcrumbHTML += '<li><a href="WikiLeirão.html">WikiLeirão</a></li>';
        
        if (currentPage.includes('A.html')) {
            breadcrumbHTML += '<li aria-current="page">Série A</li>';
        } else if (currentPage.includes('B.html')) {
            breadcrumbHTML += '<li aria-current="page">Série B</li>';
        } else if (currentPage.includes('times/')) {
            const serie = currentPage.includes('Série A') ? 'A' : 'B';
            breadcrumbHTML += `<li><a href="${serie}.html">Série ${serie}</a></li>`;
            const teamName = document.querySelector('h1')?.textContent || 'Time';
            breadcrumbHTML += `<li aria-current="page">${teamName}</li>`;
        }
        
        breadcrumbHTML += '</ol>';
        breadcrumbContainer.innerHTML = breadcrumbHTML;
        
        const main = document.querySelector('main');
        if (main && !currentPage.includes('WikiLeirão.html')) {
            main.insertBefore(breadcrumbContainer, main.firstChild);
        }
    }

    enhanceMetaDescriptions() {
        // Adicionar meta description específica se não existir
        if (!document.querySelector('meta[name="description"]')) {
            const meta = document.createElement('meta');
            meta.name = 'description';
            
            const currentPage = window.location.pathname;
            if (currentPage.includes('times/')) {
                const teamName = document.querySelector('h1')?.textContent || '';
                meta.content = `Conheça a história completa do ${teamName}: títulos, estádio, ídolos, curiosidades e muito mais no WikiLeirão.`;
            }
            
            document.head.appendChild(meta);
        }
    }

    addStructuredData() {
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('times/')) {
            const teamName = document.querySelector('h1')?.textContent || '';
            const founded = document.querySelector('.info-time p')?.textContent?.match(/\d{4}/)?.[0] || '';
            
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "SportsTeam",
                "name": teamName,
                "sport": "Futebol",
                "foundingDate": founded,
                "url": window.location.href
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }
    }

    // Theme toggle (placeholder para futuras implementações)
    setupTheme() {
        // Implementação futura para modo escuro/claro
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
    
    // Carregar base de dados dos times primeiro
    const script = document.createElement('script');
    script.src = 'js/teams-database.js';
    script.onload = () => {
        new WikiLeirao();
        perfMonitor.endTimer('WikiLeirao Init');
    };
    document.head.appendChild(script);
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