class EstadiosPage {
    constructor() {
        this.estadios = [];
        this.filteredEstadios = [];
        this.currentCategory = 'all';
        this.currentSort = 'name';
        this.mapView = false;
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupSearch();
        this.setupCardInteractions();
        this.setupAnimations();
        this.setupVirtualTour();
        this.setupCapacityComparison();
        this.loadEstadiosData();
    }

    // Carregar dados dos estádios
    loadEstadiosData() {
        this.estadios = [
            {
                id: 'maracana',
                name: 'Maracanã',
                fullName: 'Estádio Jornalista Mário Filho',
                city: 'Rio de Janeiro',
                state: 'RJ',
                capacity: 78838,
                category: 'grandes',
                teams: ['Flamengo', 'Fluminense'],
                inaugurated: 1950,
                description: 'O maior estádio do Brasil e um dos mais icônicos do mundo.',
                image: 'https://itograss.com.br/media/upload/ckeditor/2025/04/08/maracana-3_objy3mi.webp',
                url: 'estadios/maracana.html',
                coordinates: [-22.9122, -43.2302],
                events: ['Copa do Mundo 1950', 'Copa do Mundo 2014', 'Olimpíadas 2016']
            },
            {
                id: 'morumbi',
                name: 'Morumbis',
                fullName: 'Estádio Cícero Pompeu de Toledo',
                city: 'São Paulo',
                state: 'SP',
                capacity: 72039,
                category: 'grandes',
                teams: ['São Paulo'],
                inaugurated: 1960,
                description: 'Um dos maiores estádios particulares do mundo.',
                image: 'https://esportes.r7.com/resizer/F5dAkYCDuzsSZNypzRVWpQ6cDXo=/arc-photo-newr7/arc2-prod/public/F3T2HOCWF5LY7BWJVJ562B32TQ.jpg',
                url: 'estadios/morumbi.html',
                coordinates: [-23.6005, -46.7208],
                events: ['Libertadores', 'Mundial de Clubes']
            },
            {
                id: 'castelao',
                name: 'Arena Castelão',
                fullName: 'Estádio Governador Plácido Castelo',
                city: 'Fortaleza',
                state: 'CE',
                capacity: 63903,
                category: 'grandes',
                teams: ['Fortaleza', 'Ceará'],
                inaugurated: 1973,
                description: 'Maior estádio do Nordeste.',
                image: 'https://www.ceara.gov.br/wp-content/uploads/2023/02/230228_GOV-VISITA-CASTELAO_CG1935_1_2.jpg',
                url: 'estadios/castelao.html',
                coordinates: [-3.8073, -38.5220],
                events: ['Copa do Mundo 2014', 'Copa das Confederações 2013']
            },
            {
                id: 'mineirao',
                name: 'Mineirão',
                fullName: 'Estádio Governador Magalhães Pinto',
                city: 'Belo Horizonte',
                state: 'MG',
                capacity: 61846,
                category: 'grandes',
                teams: ['Atlético-MG', 'Cruzeiro'],
                inaugurated: 1965,
                description: 'Palco do histórico 7x1 da Copa de 2014.',
                image: 'https://otempo.scene7.com/is/image/sempreeditora/futebol%20nacional-mineirao-pampulha-belo-horizonte-1725487196',
                url: 'estadios/mineirao.html',
                coordinates: [-19.8658, -43.9719],
                events: ['Copa do Mundo 2014', 'Libertadores']
            },
            {
                id: 'neo-quimica-arena',
                name: 'Neo Química Arena',
                fullName: 'Neo Química Arena',
                city: 'São Paulo',
                state: 'SP',
                capacity: 47605,
                category: 'modernos',
                teams: ['Corinthians'],
                inaugurated: 2014,
                description: 'Estádio moderno construído para a Copa do Mundo de 2014.',
                image: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2025/06/Flamengo-x-Corinthians-na-Neo-Quimica-Arena-scaled-aspect-ratio-512-320.jpg',
                url: 'estadios/neo-quimica-arena.html',
                coordinates: [-23.5455, -46.4733],
                events: ['Copa do Mundo 2014', 'Olimpíadas 2016']
            },
            {
                id: 'allianz-parque',
                name: 'Allianz Parque',
                fullName: 'Allianz Parque',
                city: 'São Paulo',
                state: 'SP',
                capacity: 43713,
                category: 'modernos',
                teams: ['Palmeiras'],
                inaugurated: 2014,
                description: 'Arena multiuso moderna, casa do Palmeiras.',
                image: 'https://www.palmeiras.com.br/wp-content/uploads/2019/08/allianz-parque-1.jpg',
                url: 'estadios/allianz-parque.html',
                coordinates: [-23.5273, -46.6814],
                events: ['Shows internacionais', 'Libertadores']
            },
            {
                id: 'arena-gremio',
                name: 'Arena do Grêmio',
                fullName: 'Arena do Grêmio',
                city: 'Porto Alegre',
                state: 'RS',
                capacity: 55662,
                category: 'modernos',
                teams: ['Grêmio'],
                inaugurated: 2012,
                description: 'Estádio moderno e imponente, casa do Grêmio.',
                image: 'https://imgmd.net/images/v1/guia/1713733/arena-do-gremio.jpg',
                url: 'estadios/arena-gremio.html',
                coordinates: [-30.0677, -51.2040],
                events: ['Copa América 2019', 'Libertadores']
            },
            {
                id: 'arena-mrv',
                name: 'Arena MRV',
                fullName: 'Arena MRV',
                city: 'Belo Horizonte',
                state: 'MG',
                capacity: 46000,
                category: 'modernos',
                teams: ['Atlético-MG'],
                inaugurated: 2023,
                description: 'O mais novo estádio do futebol brasileiro.',
                image: 'https://i.superesportes.com.br/Q3mYlqyPK0McpETCmQ-WezHPOhI=/smart/imgsapp.mg.superesportes.com.br/app/noticia_126420360808/2023/01/25/3986626/arena-mrv_1_75359.jpg',
                url: 'estadios/arena-mrv.html',
                coordinates: [-19.8658, -43.9400],
                events: ['Inauguração 2023']
            },
            {
                id: 'vila-belmiro',
                name: 'Vila Belmiro',
                fullName: 'Estádio Urbano Caldeira',
                city: 'Santos',
                state: 'SP',
                capacity: 16068,
                category: 'historicos',
                teams: ['Santos'],
                inaugurated: 1916,
                description: 'Casa histórica do Santos e de Pelé.',
                image: 'https://mapamnt.procomum.org/wp-content/uploads/2021/06/93492k21.png',
                url: 'estadios/vila-belmiro.html',
                coordinates: [-23.9618, -46.3322],
                events: ['Era Pelé', 'Libertadores']
            },
            {
                id: 'sao-januario',
                name: 'São Januário',
                fullName: 'Estádio Vasco da Gama',
                city: 'Rio de Janeiro',
                state: 'RJ',
                capacity: 21880,
                category: 'historicos',
                teams: ['Vasco'],
                inaugurated: 1927,
                description: 'Estádio histórico e símbolo da resistência vascaína.',
                image: 'https://lncimg.lance.com.br/uploads/2024/10/sao_januario-scaled-aspect-ratio-512-320.jpg',
                url: 'estadios/sao-januario.html',
                coordinates: [-22.8889, -43.2289],
                events: ['História do futebol brasileiro']
            },
            {
                id: 'couto-pereira',
                name: 'Couto Pereira',
                fullName: 'Estádio Major Antônio Couto Pereira',
                city: 'Curitiba',
                state: 'PR',
                capacity: 40502,
                category: 'historicos',
                teams: ['Coritiba'],
                inaugurated: 1932,
                description: 'Um dos estádios mais tradicionais do Sul do Brasil.',
                image: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2024/10/couto_pereira-aspect-ratio-512-320.jpg',
                url: 'estadios/couto-pereira.html',
                coordinates: [-25.4489, -49.2767],
                events: ['Brasileirão 1985', 'Visita do Papa']
            }
        ];

        this.filteredEstadios = [...this.estadios];
        this.renderEstadios();
        this.updateStats();
        this.createCapacityChart();
    }

    // Renderizar estádios
    renderEstadios() {
        const categorySections = document.querySelectorAll('.categoria-section');
        
        categorySections.forEach(section => {
            const categoryTitle = section.querySelector('.categoria-title').textContent;
            const cardsContainer = section.querySelector('.estadios-cards');
            
            let categoryEstadios = [];
            
            if (categoryTitle.includes('Grandes')) {
                categoryEstadios = this.filteredEstadios.filter(e => e.category === 'grandes');
            } else if (categoryTitle.includes('Modernos')) {
                categoryEstadios = this.filteredEstadios.filter(e => e.category === 'modernos');
            } else if (categoryTitle.includes('Históricos')) {
                categoryEstadios = this.filteredEstadios.filter(e => e.category === 'historicos');
            }

            if (categoryEstadios.length > 0) {
                section.style.display = 'block';
                cardsContainer.innerHTML = categoryEstadios.map(estadio => this.createEstadioCard(estadio)).join('');
            } else {
                section.style.display = 'none';
            }
        });

        this.setupCardInteractions();
    }

    createEstadioCard(estadio) {
        return `
            <div class="estadio-card enhanced" data-estadio="${estadio.id}">
                <div class="estadio-image">
                    <img src="${estadio.image}" alt="${estadio.name}" loading="lazy" />
                    <div class="image-overlay">
                        <button class="virtual-tour-btn" data-estadio="${estadio.id}">🏟️ Tour Virtual</button>
                        <button class="compare-btn" data-estadio="${estadio.id}">⚖️ Comparar</button>
                    </div>
                    <div class="capacity-badge">
                        <span class="capacity-number">${estadio.capacity.toLocaleString()}</span>
                        <span class="capacity-label">lugares</span>
                    </div>
                </div>
                <div class="estadio-info">
                    <h3>${estadio.name}</h3>
                    <div class="estadio-details">
                        <span class="cidade">${estadio.city} - ${estadio.state}</span>
                        <span class="inauguracao">Inaugurado em ${estadio.inaugurated}</span>
                    </div>
                    <div class="estadio-teams">
                        ${estadio.teams.map(team => `<span class="time-tag">${team}</span>`).join('')}
                    </div>
                    <p class="estadio-descricao">${estadio.description}</p>
                    <div class="estadio-events">
                        <strong>Eventos marcantes:</strong>
                        <div class="events-list">
                            ${estadio.events.slice(0, 2).map(event => `<span class="event-badge">${event}</span>`).join('')}
                            ${estadio.events.length > 2 ? `<span class="more-events">+${estadio.events.length - 2}</span>` : ''}
                        </div>
                    </div>
                    <a href="${estadio.url}" class="estadio-link">Ver mais →</a>
                </div>
            </div>
        `;
    }

    // Interações dos cards
    setupCardInteractions() {
        const cards = document.querySelectorAll('.estadio-card');
        
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

            // Virtual tour
            const tourBtn = card.querySelector('.virtual-tour-btn');
            if (tourBtn) {
                tourBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.startVirtualTour(tourBtn.dataset.estadio);
                });
            }

            // Compare
            const compareBtn = card.querySelector('.compare-btn');
            if (compareBtn) {
                compareBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.addToComparison(compareBtn.dataset.estadio);
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

        document.querySelectorAll('.estadio-card').forEach(card => {
            cardObserver.observe(card);
        });
    }

    animateResults() {
        const cards = document.querySelectorAll('.estadio-card');
        
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

    // Tour virtual
    setupVirtualTour() {
        const tourModal = document.createElement('div');
        tourModal.className = 'virtual-tour-modal';
        tourModal.innerHTML = `
            <div class="tour-overlay"></div>
            <div class="tour-content">
                <div class="tour-header">
                    <h2 id="tour-title">Tour Virtual</h2>
                    <button class="tour-close">✕</button>
                </div>
                <div class="tour-body">
                    <div class="tour-image-container">
                        <img id="tour-image" src="" alt="" />
                        <div class="tour-controls">
                            <button class="tour-btn" data-view="external">🏟️ Vista Externa</button>
                            <button class="tour-btn" data-view="internal">👁️ Vista Interna</button>
                            <button class="tour-btn" data-view="aerial">🚁 Vista Aérea</button>
                        </div>
                    </div>
                    <div class="tour-info">
                        <div id="tour-details"></div>
                        <div class="tour-stats">
                            <div class="tour-stat">
                                <span class="stat-label">Capacidade</span>
                                <span class="stat-value" id="tour-capacity"></span>
                            </div>
                            <div class="tour-stat">
                                <span class="stat-label">Inauguração</span>
                                <span class="stat-value" id="tour-inaugurated"></span>
                            </div>
                            <div class="tour-stat">
                                <span class="stat-label">Times</span>
                                <span class="stat-value" id="tour-teams"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(tourModal);

        // Event listeners
        tourModal.querySelector('.tour-close').addEventListener('click', () => {
            this.closeTour();
        });

        tourModal.querySelector('.tour-overlay').addEventListener('click', () => {
            this.closeTour();
        });

        const tourButtons = tourModal.querySelectorAll('.tour-btn');
        tourButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tourButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.changeTourView(btn.dataset.view);
            });
        });
    }

    startVirtualTour(estadioId) {
        const estadio = this.estadios.find(e => e.id === estadioId);
        if (!estadio) return;

        const tourModal = document.querySelector('.virtual-tour-modal');
        
        // Atualizar conteúdo
        document.getElementById('tour-title').textContent = `Tour Virtual - ${estadio.name}`;
        document.getElementById('tour-image').src = estadio.image;
        document.getElementById('tour-image').alt = estadio.name;
        document.getElementById('tour-capacity').textContent = estadio.capacity.toLocaleString();
        document.getElementById('tour-inaugurated').textContent = estadio.inaugurated;
        document.getElementById('tour-teams').textContent = estadio.teams.join(', ');
        
        document.getElementById('tour-details').innerHTML = `
            <h3>${estadio.fullName}</h3>
            <p><strong>Localização:</strong> ${estadio.city}, ${estadio.state}</p>
            <p><strong>Categoria:</strong> ${this.getCategoryName(estadio.category)}</p>
            <p>${estadio.description}</p>
            <div class="tour-events">
                <strong>Eventos marcantes:</strong>
                <ul>
                    ${estadio.events.map(event => `<li>${event}</li>`).join('')}
                </ul>
            </div>
        `;

        tourModal.style.display = 'flex';
        setTimeout(() => {
            tourModal.classList.add('active');
        }, 10);

        // Ativar primeira vista
        const firstBtn = tourModal.querySelector('.tour-btn');
        firstBtn.classList.add('active');
    }

    changeTourView(view) {
        // Placeholder para diferentes vistas do estádio
        const tourImage = document.getElementById('tour-image');
        
        switch (view) {
            case 'external':
                // Manter imagem atual (vista externa)
                break;
            case 'internal':
                // Simular vista interna
                tourImage.style.filter = 'sepia(20%) saturate(120%)';
                break;
            case 'aerial':
                // Simular vista aérea
                tourImage.style.filter = 'brightness(110%) contrast(110%)';
                break;
        }
    }

    closeTour() {
        const tourModal = document.querySelector('.virtual-tour-modal');
        tourModal.classList.remove('active');
        setTimeout(() => {
            tourModal.style.display = 'none';
            // Reset filters
            document.getElementById('tour-image').style.filter = 'none';
        }, 300);
    }

    getCategoryName(category) {
        const names = {
            'grandes': 'Grande Estádio',
            'modernos': 'Estádio Moderno',
            'historicos': 'Estádio Histórico'
        };
        return names[category] || category;
    }

    // Comparação de capacidades
    setupCapacityComparison() {
        this.comparisonList = [];
        
        const comparisonContainer = document.createElement('div');
        comparisonContainer.className = 'capacity-comparison-container';
        comparisonContainer.innerHTML = `
            <div class="comparison-header">
                <h4>Comparação de Capacidades</h4>
                <button class="clear-comparison">Limpar</button>
            </div>
            <div class="comparison-chart" id="comparison-chart"></div>
            <div class="comparison-list" id="comparison-list-estadios"></div>
        `;

        document.body.appendChild(comparisonContainer);

        // Event listeners
        comparisonContainer.querySelector('.clear-comparison').addEventListener('click', () => {
            this.clearCapacityComparison();
        });
    }

    addToComparison(estadioId) {
        if (this.comparisonList.includes(estadioId)) {
            this.showNotification('Estádio já está na comparação!');
            return;
        }

        if (this.comparisonList.length >= 5) {
            this.showNotification('Máximo de 5 estádios para comparação!');
            return;
        }

        this.comparisonList.push(estadioId);
        this.updateCapacityComparison();
        this.showNotification('Estádio adicionado à comparação!');
    }

    updateCapacityComparison() {
        const comparisonContainer = document.querySelector('.capacity-comparison-container');
        const comparisonList = document.getElementById('comparison-list-estadios');
        const comparisonChart = document.getElementById('comparison-chart');

        if (this.comparisonList.length > 0) {
            comparisonContainer.classList.add('active');
            
            // Lista de estádios
            comparisonList.innerHTML = this.comparisonList.map(estadioId => {
                const estadio = this.estadios.find(e => e.id === estadioId);
                return `
                    <div class="comparison-item">
                        <img src="${estadio.image}" alt="${estadio.name}" />
                        <div class="comparison-info">
                            <strong>${estadio.name}</strong>
                            <span>${estadio.capacity.toLocaleString()} lugares</span>
                        </div>
                        <button class="remove-comparison" data-estadio="${estadioId}">✕</button>
                    </div>
                `;
            }).join('');

            // Gráfico de barras simples
            const maxCapacity = Math.max(...this.comparisonList.map(id => 
                this.estadios.find(e => e.id === id).capacity
            ));

            comparisonChart.innerHTML = this.comparisonList.map(estadioId => {
                const estadio = this.estadios.find(e => e.id === estadioId);
                const percentage = (estadio.capacity / maxCapacity) * 100;
                
                return `
                    <div class="chart-bar">
                        <div class="bar-label">${estadio.name}</div>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: ${percentage}%"></div>
                            <span class="bar-value">${estadio.capacity.toLocaleString()}</span>
                        </div>
                    </div>
                `;
            }).join('');

            // Event listeners para remoção
            comparisonList.querySelectorAll('.remove-comparison').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.removeFromCapacityComparison(btn.dataset.estadio);
                });
            });
        } else {
            comparisonContainer.classList.remove('active');
        }
    }

    removeFromCapacityComparison(estadioId) {
        this.comparisonList = this.comparisonList.filter(id => id !== estadioId);
        this.updateCapacityComparison();
    }

    clearCapacityComparison() {
        this.comparisonList = [];
        this.updateCapacityComparison();
    }

    // Gráfico de capacidades
    createCapacityChart() {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'capacity-chart-container';
        chartContainer.innerHTML = `
            <h3>Distribuição de Capacidades</h3>
            <div class="capacity-chart" id="main-capacity-chart"></div>
            <div class="chart-legend">
                <div class="legend-item">
                    <span class="legend-color small"></span>
                    <span>Até 25.000</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color medium"></span>
                    <span>25.000 - 50.000</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color large"></span>
                    <span>50.000 - 75.000</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color huge"></span>
                    <span>Mais de 75.000</span>
                </div>
            </div>
        `;

        const filtersContainer = document.querySelector('.estadios-filters');
        if (filtersContainer) {
            filtersContainer.appendChild(chartContainer);
        }

        this.updateCapacityChart();
    }

    updateCapacityChart() {
        const chartContainer = document.getElementById('main-capacity-chart');
        if (!chartContainer) return;

        const categories = {
            small: this.filteredEstadios.filter(e => e.capacity <= 25000).length,
            medium: this.filteredEstadios.filter(e => e.capacity > 25000 && e.capacity <= 50000).length,
            large: this.filteredEstadios.filter(e => e.capacity > 50000 && e.capacity <= 75000).length,
            huge: this.filteredEstadios.filter(e => e.capacity > 75000).length
        };

        const total = Object.values(categories).reduce((sum, count) => sum + count, 0);

        chartContainer.innerHTML = Object.entries(categories).map(([category, count]) => {
            const percentage = total > 0 ? (count / total) * 100 : 0;
            return `
                <div class="chart-segment ${category}" style="width: ${percentage}%" title="${count} estádios">
                    ${count > 0 ? count : ''}
                </div>
            `;
        }).join('');
    }

    // Mudança de visualização
    changeView(viewType) {
        const estadiosGrid = document.querySelector('.estadios-grid');
        
        switch (viewType) {
            case 'map':
                this.showMapView();
                break;
            case 'list':
                estadiosGrid.classList.add('list-view');
                estadiosGrid.classList.remove('map-view');
                break;
            default:
                estadiosGrid.classList.remove('list-view', 'map-view');
                break;
        }
    }

    showMapView() {
        // Placeholder para visualização em mapa
        const mapContainer = document.createElement('div');
        mapContainer.className = 'map-view-container';
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <h3>🗺️ Visualização em Mapa</h3>
                <p>Funcionalidade de mapa será implementada em breve!</p>
                <div class="map-estadios-list">
                    ${this.filteredEstadios.map(estadio => `
                        <div class="map-estadio-item" data-lat="${estadio.coordinates[0]}" data-lng="${estadio.coordinates[1]}">
                            <strong>${estadio.name}</strong>
                            <span>${estadio.city}, ${estadio.state}</span>
                            <span>${estadio.capacity.toLocaleString()} lugares</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const estadiosGrid = document.querySelector('.estadios-grid');
        estadiosGrid.innerHTML = '';
        estadiosGrid.appendChild(mapContainer);
        estadiosGrid.classList.add('map-view');
    }

    // Atualizar estatísticas
    updateStats() {
        const totalEstadios = this.filteredEstadios.length;
        const totalCapacity = this.filteredEstadios.reduce((sum, estadio) => sum + estadio.capacity, 0);
        const avgCapacity = totalEstadios > 0 ? Math.round(totalCapacity / totalEstadios) : 0;

        document.getElementById('total-estadios').textContent = totalEstadios;
        document.getElementById('total-capacity').textContent = totalCapacity.toLocaleString();
        document.getElementById('avg-capacity').textContent = avgCapacity.toLocaleString();

        this.updateCapacityChart();
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
    new EstadiosPage();
});

// Exportar para uso global se necessário
if (typeof window !== 'undefined') {
    window.EstadiosPage = EstadiosPage;
}