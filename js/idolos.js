class IdolosPage {
    constructor() {
        this.idolos = [];
        this.filteredIdolos = [];
        this.currentFilter = 'all';
        this.currentSort = 'name';
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupSearch();
        this.setupCardInteractions();
        this.setupAnimations();
        this.setupLightbox();
        this.setupComparison();
        this.loadIdolosData();
    }

    // Carregar dados dos ídolos
    loadIdolosData() {
        // Dados dos ídolos baseados no HTML existente
        this.idolos = [
            {
                id: 'pele',
                name: 'Pelé',
                club: 'Santos',
                serie: 'A',
                position: 'Atacante',
                period: '1956-1974',
                goals: 1281,
                games: 1363,
                titles: ['3x Copa do Mundo', '2x Mundial de Clubes', '2x Libertadores'],
                description: 'O "Rei do Futebol", considerado o maior jogador de todos os tempos.',
                image: 'https://assets.goal.com/images/v3/bltaf5993a2bddfe395/Pel%C3%A9_1970.jpg?auto=webp&format=pjpg&width=3840&quality=60',
                url: 'idolos/pele.html'
            },
            {
                id: 'zico',
                name: 'Zico',
                club: 'Flamengo',
                serie: 'A',
                position: 'Meia-atacante',
                period: '1971-1989',
                goals: 508,
                games: 730,
                titles: ['1x Mundial de Clubes', '1x Libertadores', '4x Brasileirão'],
                description: 'O "Galinho de Quintino", maior ídolo da história do Flamengo.',
                image: 'https://img.cmswebsg.com.br/diariodigitalcapixaba.com.br/image?src=https://diariodigitalcapixaba.com.br/images/noticias/1109/28082020071407_A_Vida_De_.jpg&w=800&h=600&output=webp',
                url: 'idolos/zico.html'
            },
            {
                id: 'socrates',
                name: 'Sócrates',
                club: 'Corinthians',
                serie: 'A',
                position: 'Meia',
                period: '1978-1984',
                goals: 172,
                games: 298,
                titles: ['3x Paulistão'],
                description: 'Líder da Democracia Corinthiana e um dos maiores jogadores da história.',
                image: 'https://conteudo.imguol.com.br/c/esporte/0d/2021/02/19/socrates-comemorando-gol-pelo-corinthians-1613756247465_v2_3x4.jpg',
                url: 'idolos/socrates.html'
            },
            {
                id: 'ademir-da-guia',
                name: 'Ademir da Guia',
                club: 'Palmeiras',
                serie: 'A',
                position: 'Meio-campista',
                period: '1961-1977',
                goals: 155,
                games: 902,
                titles: ['5x Brasileirão', '5x Paulistão'],
                description: 'O "Divino", maior ídolo da história do Palmeiras.',
                image: 'https://i.ytimg.com/vi/_9e_9EcHmQA/maxresdefault.jpg',
                url: 'idolos/ademir-da-guia.html'
            },
            {
                id: 'rogerio-ceni',
                name: 'Rogério Ceni',
                club: 'São Paulo',
                serie: 'A',
                position: 'Goleiro',
                period: '1990-2015',
                goals: 131,
                games: 1237,
                titles: ['2x Mundial de Clubes', '2x Libertadores', '3x Brasileirão'],
                description: 'O "M1TO", goleiro artilheiro e recordista de jogos.',
                image: 'https://cdn.espn.com.br/image/wide/622_9c5b5dcf-b9a8-3ce4-bade-1ebffb9cbca0.png',
                url: 'idolos/rogerio-ceni.html'
            },
            {
                id: 'garrincha',
                name: 'Garrincha',
                club: 'Botafogo',
                serie: 'A',
                position: 'Ponta-direita',
                period: '1953-1965',
                goals: 245,
                games: 614,
                titles: ['2x Copa do Mundo', '3x Carioca'],
                description: 'O "Anjo das Pernas Tortas", um dos maiores dribladores da história.',
                image: 'https://geraldomayrink.com.br/wp-content/uploads/2020/11/garrincha_Destaque.jpg',
                url: 'idolos/garrincha.html'
            },
            // Ídolos da Série B
            {
                id: 'dirceu-kruger',
                name: 'Dirceu Krüger',
                club: 'Coritiba',
                serie: 'B',
                position: 'Meio-campista',
                period: '1966-1975',
                goals: 58,
                games: 252,
                titles: ['1x Brasileirão', '7x Paranaense'],
                description: 'O "Flecha Loira", maior ídolo da história do Coritiba.',
                image: 'https://s2-ge.glbimg.com/WngtKPifrQc5EsX-J0WfuvTXVpM=/0x0:623x470/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2019/u/5/fsipsCSMatcnW5KYQMLg/196xkruger-1-.jpg',
                url: 'idolos/dirceu-kruger.html'
            },
            {
                id: 'fred',
                name: 'Fred',
                club: 'América-MG',
                serie: 'B',
                position: 'Atacante',
                period: '2003-2004, 2018',
                goals: 48,
                games: 72,
                titles: ['1x Mineiro'],
                description: 'Revelado no América-MG, tornou-se ídolo antes de brilhar em grandes clubes.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSihbZ1mBOJB3HtiGoIzQj1djp8UquTd4xmFQ&s',
                url: 'idolos/fred.html'
            }
        ];

        this.filteredIdolos = [...this.idolos];
        this.renderIdolos();
        this.updateStats();
    }

    // Renderizar ídolos
    renderIdolos() {
        const serieASection = document.querySelector('.serie-section:first-of-type .idolos-cards');
        const serieBSection = document.querySelector('.serie-section:last-of-type .idolos-cards');

        if (!serieASection || !serieBSection) return;

        const serieAIdolos = this.filteredIdolos.filter(idolo => idolo.serie === 'A');
        const serieBIdolos = this.filteredIdolos.filter(idolo => idolo.serie === 'B');

        serieASection.innerHTML = serieAIdolos.map(idolo => this.createIdoloCard(idolo)).join('');
        serieBSection.innerHTML = serieBIdolos.map(idolo => this.createIdoloCard(idolo)).join('');

        this.setupCardInteractions();
    }

    createIdoloCard(idolo) {
        return `
            <div class="idolo-card enhanced" data-idolo="${idolo.id}">
                <div class="idolo-image">
                    <img src="${idolo.image}" alt="${idolo.name}" loading="lazy" />
                    <div class="image-overlay">
                        <button class="quick-view-btn" data-idolo="${idolo.id}">👁️ Ver Detalhes</button>
                        <button class="compare-btn" data-idolo="${idolo.id}">⚖️ Comparar</button>
                    </div>
                </div>
                <div class="idolo-info">
                    <h3>${idolo.name}</h3>
                    <span class="idolo-clube">${idolo.club}</span>
                    <div class="idolo-stats">
                        <div class="stat">
                            <span class="stat-value">${idolo.goals}</span>
                            <span class="stat-label">Gols</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${idolo.games}</span>
                            <span class="stat-label">Jogos</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${idolo.period}</span>
                            <span class="stat-label">Período</span>
                        </div>
                    </div>
                    <p class="idolo-descricao">${idolo.description}</p>
                    <div class="idolo-titles">
                        ${idolo.titles.slice(0, 2).map(title => `<span class="title-badge">${title}</span>`).join('')}
                        ${idolo.titles.length > 2 ? `<span class="more-titles">+${idolo.titles.length - 2}</span>` : ''}
                    </div>
                    <a href="${idolo.url}" class="idolo-link">Ver mais →</a>
                </div>
            </div>
        `;
    }

    // Interações dos cards
    setupCardInteractions() {
        const cards = document.querySelectorAll('.idolo-card');
        
        cards.forEach(card => {
            // Hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.querySelector('.image-overlay').style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.querySelector('.image-overlay').style.opacity = '0';
            });

            // Quick view
            const quickViewBtn = card.querySelector('.quick-view-btn');
            if (quickViewBtn) {
                quickViewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showQuickView(quickViewBtn.dataset.idolo);
                });
            }

            // Compare
            const compareBtn = card.querySelector('.compare-btn');
            if (compareBtn) {
                compareBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.addToComparison(compareBtn.dataset.idolo);
                });
            }
        });
    }

    // Animações
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.idolo-card').forEach(card => {
            cardObserver.observe(card);
        });
    }

    animateResults() {
        const cards = document.querySelectorAll('.idolo-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Lightbox para visualização rápida
    setupLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'idolo-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">✕</button>
                <div class="lightbox-body"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        // Event listeners
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });

        lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => {
            this.closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });
    }

    showQuickView(idoloId) {
        const idolo = this.idolos.find(i => i.id === idoloId);
        if (!idolo) return;

        const lightbox = document.querySelector('.idolo-lightbox');
        const lightboxBody = lightbox.querySelector('.lightbox-body');

        lightboxBody.innerHTML = `
            <div class="quick-view-content">
                <div class="quick-view-header">
                    <img src="${idolo.image}" alt="${idolo.name}" />
                    <div class="header-info">
                        <h2>${idolo.name}</h2>
                        <p class="club-info">${idolo.club} - ${idolo.position}</p>
                        <p class="period-info">${idolo.period}</p>
                    </div>
                </div>
                <div class="quick-view-stats">
                    <div class="stat-card">
                        <span class="stat-number">${idolo.goals}</span>
                        <span class="stat-label">Gols</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${idolo.games}</span>
                        <span class="stat-label">Jogos</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${(idolo.goals / idolo.games * 100).toFixed(1)}%</span>
                        <span class="stat-label">Média de Gols</span>
                    </div>
                </div>
                <div class="quick-view-description">
                    <p>${idolo.description}</p>
                </div>
                <div class="quick-view-titles">
                    <h4>Principais Títulos:</h4>
                    <ul>
                        ${idolo.titles.map(title => `<li>${title}</li>`).join('')}
                    </ul>
                </div>
                <div class="quick-view-actions">
                    <a href="${idolo.url}" class="btn btn-primary">Ver Página Completa</a>
                    <button class="btn btn-secondary" onclick="window.idolosPage.addToComparison('${idolo.id}')">Adicionar à Comparação</button>
                </div>
            </div>
        `;

        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
    }

    closeLightbox() {
        const lightbox = document.querySelector('.idolo-lightbox');
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    }

    // Sistema de comparação
    setupComparison() {
        this.comparisonList = [];
        
        const comparisonContainer = document.createElement('div');
        comparisonContainer.className = 'comparison-container';
        comparisonContainer.innerHTML = `
            <div class="comparison-header">
                <h4>Comparação de Ídolos</h4>
                <button class="clear-comparison">Limpar</button>
            </div>
            <div class="comparison-list" id="comparison-list"></div>
            <button class="compare-button" id="compare-button" disabled>Comparar Selecionados</button>
        `;

        document.body.appendChild(comparisonContainer);

        // Event listeners
        comparisonContainer.querySelector('.clear-comparison').addEventListener('click', () => {
            this.clearComparison();
        });

        comparisonContainer.querySelector('#compare-button').addEventListener('click', () => {
            this.showComparison();
        });
    }

    addToComparison(idoloId) {
        if (this.comparisonList.includes(idoloId)) {
            this.showNotification('Ídolo já está na comparação!');
            return;
        }

        if (this.comparisonList.length >= 3) {
            this.showNotification('Máximo de 3 ídolos para comparação!');
            return;
        }

        this.comparisonList.push(idoloId);
        this.updateComparisonUI();
        this.showNotification('Ídolo adicionado à comparação!');
    }

    updateComparisonUI() {
        const comparisonContainer = document.querySelector('.comparison-container');
        const comparisonList = document.getElementById('comparison-list');
        const compareButton = document.getElementById('compare-button');

        if (this.comparisonList.length > 0) {
            comparisonContainer.classList.add('active');
            
            comparisonList.innerHTML = this.comparisonList.map(idoloId => {
                const idolo = this.idolos.find(i => i.id === idoloId);
                return `
                    <div class="comparison-item">
                        <img src="${idolo.image}" alt="${idolo.name}" />
                        <span>${idolo.name}</span>
                        <button class="remove-comparison" data-idolo="${idoloId}">✕</button>
                    </div>
                `;
            }).join('');

            compareButton.disabled = this.comparisonList.length < 2;

            // Event listeners para remoção
            comparisonList.querySelectorAll('.remove-comparison').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.removeFromComparison(btn.dataset.idolo);
                });
            });
        } else {
            comparisonContainer.classList.remove('active');
        }
    }

    removeFromComparison(idoloId) {
        this.comparisonList = this.comparisonList.filter(id => id !== idoloId);
        this.updateComparisonUI();
    }

    clearComparison() {
        this.comparisonList = [];
        this.updateComparisonUI();
    }

    showComparison() {
        const compareIdolos = this.comparisonList.map(id => 
            this.idolos.find(idolo => idolo.id === id)
        );

        const comparisonModal = document.createElement('div');
        comparisonModal.className = 'comparison-modal';
        comparisonModal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Comparação de Ídolos</h2>
                    <button class="modal-close">✕</button>
                </div>
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Atributo</th>
                                ${compareIdolos.map(idolo => `<th>${idolo.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Clube</strong></td>
                                ${compareIdolos.map(idolo => `<td>${idolo.club}</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Posição</strong></td>
                                ${compareIdolos.map(idolo => `<td>${idolo.position}</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Período</strong></td>
                                ${compareIdolos.map(idolo => `<td>${idolo.period}</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Gols</strong></td>
                                ${compareIdolos.map(idolo => `<td class="highlight-max" data-value="${idolo.goals}">${idolo.goals}</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Jogos</strong></td>
                                ${compareIdolos.map(idolo => `<td class="highlight-max" data-value="${idolo.games}">${idolo.games}</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Média de Gols</strong></td>
                                ${compareIdolos.map(idolo => {
                                    const avg = (idolo.goals / idolo.games).toFixed(3);
                                    return `<td class="highlight-max" data-value="${avg}">${avg}</td>`;
                                }).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.body.appendChild(comparisonModal);

        // Destacar valores máximos
        this.highlightMaxValues(comparisonModal);

        // Event listeners
        comparisonModal.querySelector('.modal-close').addEventListener('click', () => {
            comparisonModal.remove();
        });

        comparisonModal.querySelector('.modal-overlay').addEventListener('click', () => {
            comparisonModal.remove();
        });

        setTimeout(() => {
            comparisonModal.classList.add('active');
        }, 10);
    }

    highlightMaxValues(modal) {
        const rows = modal.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('.highlight-max');
            if (cells.length === 0) return;

            let maxValue = -Infinity;
            cells.forEach(cell => {
                const value = parseFloat(cell.dataset.value);
                if (value > maxValue) {
                    maxValue = value;
                }
            });

            cells.forEach(cell => {
                const value = parseFloat(cell.dataset.value);
                if (value === maxValue) {
                    cell.classList.add('max-value');
                }
            });
        });
    }

    // Mudança de visualização
    changeView(viewType) {
        const idolosGrid = document.querySelector('.idolos-grid');
        
        if (viewType === 'list') {
            idolosGrid.classList.add('list-view');
        } else {
            idolosGrid.classList.remove('list-view');
        }
    }

    // Atualizar estatísticas
    updateStats() {
        const totalIdolos = this.filteredIdolos.length;
        const totalGoals = this.filteredIdolos.reduce((sum, idolo) => sum + idolo.goals, 0);
        const totalGames = this.filteredIdolos.reduce((sum, idolo) => sum + idolo.games, 0);

        document.getElementById('total-idolos').textContent = totalIdolos;
        document.getElementById('total-goals').textContent = totalGoals.toLocaleString();
        document.getElementById('total-games').textContent = totalGames.toLocaleString();
    }

    // Navegar para ídolo
    goToIdolo(idoloId) {
        const idolo = this.idolos.find(i => i.id === idoloId);
        if (idolo) {
            window.location.href = idolo.url;
        }
    }

    // Notificações
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Utilitários
const Utils = {
    debounce(func, wait) {
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
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.idolosPage = new IdolosPage();
});

// Exportar para uso global se necessário
if (typeof window !== 'undefined') {
    window.IdolosPage = IdolosPage;
}