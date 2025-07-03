// WikiLeirão - Série B Page JavaScript
class SerieBPage {
    constructor() {
        this.teams = [];
        this.filteredTeams = [];
        this.currentSort = { column: null, direction: 'asc' };
        this.regions = {
            'Norte': ['AM', 'PA'],
            'Nordeste': ['AL', 'BA', 'CE', 'PE'],
            'Centro-Oeste': ['GO', 'MT'],
            'Sudeste': ['MG', 'RJ', 'SP'],
            'Sul': ['PR', 'RS', 'SC']
        };
        this.init();
    }

    init() {
        this.setupTableInteractions();
        this.setupAdvancedSearch();
        this.setupRegionalFilters();
        this.setupTableAnimations();
        this.setupComparisonMode();
        this.setupExportFeatures();
        this.loadTeamsData();
    }

    // Carregar dados dos times da Série B
    loadTeamsData() {
        if (window.teamsDatabase) {
            this.teams = window.teamsDatabase.filter(team => team.serie === 'B');
            this.filteredTeams = [...this.teams];
            this.updateRegionalStats();
            this.createRegionalMap();
        }
    }

    createRegionalStats() {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'regional-stats';
        statsContainer.innerHTML = `
            <h4>Distribuição Regional</h4>
            <div class="region-cards">
                ${Object.entries(this.regions).map(([region, states]) => {
            const count = this.teams.filter(team => states.includes(team.state)).length;
            return `
                        <div class="region-card" data-region="${region}">
                            <div class="region-name">${region}</div>
                            <div class="region-count">${count} times</div>
                            <div class="region-percentage">${((count / this.teams.length) * 100).toFixed(1)}%</div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;

        const searchContainer = document.querySelector('.advanced-search-container');
        if (searchContainer) {
            searchContainer.appendChild(statsContainer);
        }

        // Event listeners para cards regionais
        const regionCards = statsContainer.querySelectorAll('.region-card');
        regionCards.forEach(card => {
            card.addEventListener('click', () => {
                const region = card.dataset.region;
                document.getElementById('region-filter-b').value = region;
                this.filterTeams();
                this.highlightRegion(region);
            });
        });
    }

    // Filtrar times com lógica específica da Série B
    filterTeams() {
        const searchTerm = document.getElementById('team-search-b').value.toLowerCase();
        const regionFilter = document.getElementById('region-filter-b').value;
        const foundationFilter = document.getElementById('foundation-filter').value;

        this.filteredTeams = this.teams.filter(team => {
            // Busca por texto
            const matchesSearch = !searchTerm ||
                team.name.toLowerCase().includes(searchTerm) ||
                team.city.toLowerCase().includes(searchTerm) ||
                team.nickname.some(nick => nick.toLowerCase().includes(searchTerm)) ||
                team.keywords.some(keyword => keyword.includes(searchTerm));

            // Filtro regional
            const matchesRegion = !regionFilter ||
                this.regions[regionFilter].includes(team.state);

            // Filtro por época de fundação
            let matchesFoundation = true;
            if (foundationFilter) {
                const founded = team.founded || 0;
                switch (foundationFilter) {
                    case 'old':
                        matchesFoundation = founded < 1950;
                        break;
                    case 'classic':
                        matchesFoundation = founded >= 1950 && founded <= 1980;
                        break;
                    case 'modern':
                        matchesFoundation = founded > 1980;
                        break;
                }
            }

            return matchesSearch && matchesRegion && matchesFoundation;
        });

        this.updateTableDisplay();
        this.updateSearchStats();
        this.animateResults();
    }

    // Filtros rápidos
    applyQuickFilter(filterType) {
        let filteredTeams = [];

        switch (filterType) {
            case 'traditional':
                filteredTeams = this.teams.filter(team => team.founded && team.founded < 1950);
                break;
            case 'recent':
                filteredTeams = this.teams.filter(team => team.founded && team.founded > 2000);
                break;
            case 'capitals':
                const capitals = ['Porto Alegre', 'Florianópolis', 'Curitiba', 'São Paulo', 'Rio de Janeiro',
                    'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Belém', 'Manaus', 'Goiânia'];
                filteredTeams = this.teams.filter(team => capitals.includes(team.city));
                break;
            case 'interior':
                const capitals2 = ['Porto Alegre', 'Florianópolis', 'Curitiba', 'São Paulo', 'Rio de Janeiro',
                    'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Belém', 'Manaus', 'Goiânia'];
                filteredTeams = this.teams.filter(team => !capitals2.includes(team.city));
                break;
        }

        this.filteredTeams = filteredTeams;
        this.updateTableDisplay();
        this.updateSearchStats();
    }

    // Modo de comparação entre times
    setupComparisonMode() {
        const comparisonButton = document.createElement('button');
        comparisonButton.className = 'comparison-toggle';
        comparisonButton.innerHTML = '⚖️ Modo Comparação';
        comparisonButton.addEventListener('click', () => {
            this.toggleComparisonMode();
        });

        const searchContainer = document.querySelector('.advanced-search-container');
        if (searchContainer) {
            searchContainer.appendChild(comparisonButton);
        }
    }

    toggleComparisonMode() {
        const table = document.querySelector('table');
        const isComparisonMode = table.classList.contains('comparison-mode');

        if (isComparisonMode) {
            table.classList.remove('comparison-mode');
            this.clearComparison();
        } else {
            table.classList.add('comparison-mode');
            this.enableComparison();
        }
    }

    enableComparison() {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'comparison-checkbox';

            const cell = document.createElement('td');
            cell.appendChild(checkbox);
            row.insertBefore(cell, row.firstChild);

            checkbox.addEventListener('change', () => {
                this.updateComparison();
            });
        });

        // Adicionar header para checkbox
        const headerRow = document.querySelector('thead tr');
        const headerCell = document.createElement('th');
        headerCell.innerHTML = '⚖️';
        headerRow.insertBefore(headerCell, headerRow.firstChild);
    }

    clearComparison() {
        document.querySelectorAll('.comparison-checkbox').forEach(checkbox => {
            checkbox.closest('td').remove();
        });

        const headerCheckbox = document.querySelector('thead th:first-child');
        if (headerCheckbox && headerCheckbox.innerHTML === '⚖️') {
            headerCheckbox.remove();
        }
    }

    // Animações específicas da Série B
    setupTableAnimations() {
        const tbody = document.querySelector('tbody');
        if (!tbody) return;

        // Animação de "subindo para a Série A"
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateY(20px)';

            setTimeout(() => {
                row.style.transition = 'all 0.5s ease-out';
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';

                // Efeito especial para os primeiros 4 (zona de acesso)
                if (index < 4) {
                    row.classList.add('access-zone');
                    setTimeout(() => {
                        row.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.3)';
                    }, 500);
                }
            }, index * 75);
        });
    }

    animateResults() {
        const tbody = document.querySelector('tbody');
        if (!tbody) return;

        tbody.style.transform = 'scale(0.95)';
        tbody.style.opacity = '0.7';

        setTimeout(() => {
            tbody.style.transition = 'all 0.3s ease-out';
            tbody.style.transform = 'scale(1)';
            tbody.style.opacity = '1';
        }, 100);
    }

    // Recursos de exportação
    setupExportFeatures() {
        const exportContainer = document.createElement('div');
        exportContainer.className = 'export-container';
        exportContainer.innerHTML = `
            <button id="export-csv" class="export-btn">📊 Exportar CSV</button>
            <button id="export-print" class="export-btn">🖨️ Imprimir</button>
            <button id="share-results" class="export-btn">🔗 Compartilhar</button>
        `;

        const searchContainer = document.querySelector('.advanced-search-container');
        if (searchContainer) {
            searchContainer.appendChild(exportContainer);
        }

        // Event listeners
        document.getElementById('export-csv').addEventListener('click', () => {
            this.exportToCSV();
        });

        document.getElementById('export-print').addEventListener('click', () => {
            this.printTable();
        });

        document.getElementById('share-results').addEventListener('click', () => {
            this.shareResults();
        });
    }

    exportToCSV() {
        const headers = ['Time', 'Cidade', 'Estado', 'Fundação', 'Estádio', 'Mascote'];
        const csvContent = [
            headers.join(','),
            ...this.filteredTeams.map(team => [
                team.name,
                team.city,
                team.state,
                team.founded,
                team.stadium,
                team.mascot
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'serie-b-times.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    printTable() {
        const printWindow = window.open('', '_blank');
        const tableHTML = document.querySelector('.container-tabela').outerHTML;

        printWindow.document.write(`
            <html>
                <head>
                    <title>Times da Série B - WikiLeirão</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h1>Times da Série B - WikiLeirão</h1>
                    ${tableHTML}
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.print();
    }

    shareResults() {
        const url = window.location.href;
        const text = `Confira os times da Série B no WikiLeirão: ${this.filteredTeams.length} times encontrados`;

        if (navigator.share) {
            navigator.share({
                title: 'Times da Série B - WikiLeirão',
                text: text,
                url: url
            });
        } else {
            // Fallback para clipboard
            navigator.clipboard.writeText(`${text} - ${url}`).then(() => {
                this.showNotification('Link copiado para a área de transferência!');
            });
        }
    }

    // Utilitários específicos
    highlightRegion(region) {
        const regionCards = document.querySelectorAll('.region-card');
        regionCards.forEach(card => {
            card.classList.remove('highlighted');
            if (card.dataset.region === region) {
                card.classList.add('highlighted');
            }
        });
    }

    clearRegionHighlight() {
        document.querySelectorAll('.region-card').forEach(card => {
            card.classList.remove('highlighted');
        });
    }

    updateSearchStats() {
        const existingStats = document.querySelector('.search-stats');
        if (existingStats) {
            existingStats.remove();
        }

        const statsContainer = document.createElement('div');
        statsContainer.className = 'search-stats';
        statsContainer.innerHTML = `
            <div class="stats-summary">
                <span class="result-count">${this.filteredTeams.length}</span> de 
                <span class="total-count">${this.teams.length}</span> times encontrados
            </div>
        `;

        const searchContainer = document.querySelector('.advanced-search-container');
        if (searchContainer) {
            searchContainer.appendChild(statsContainer);
        }
    }

    updateRegionalStats() {
        // Atualizar estatísticas regionais quando os dados mudarem
        Object.entries(this.regions).forEach(([region, states]) => {
            const count = this.filteredTeams.filter(team => states.includes(team.state)).length;
            const card = document.querySelector(`[data-region="${region}"] .region-count`);
            if (card) {
                card.textContent = `${count} times`;
            }
        });
    }

    createRegionalMap() {
        // Placeholder para um futuro mapa interativo
        console.log('Regional map feature - to be implemented');
    }

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

    updateTableDisplay() {
        // Implementação similar à Série A, mas com adaptações específicas
        const tbody = document.querySelector('tbody');
        if (!tbody) return;

        tbody.style.opacity = '0.5';

        setTimeout(() => {
            const rows = tbody.querySelectorAll('tr');

            this.filteredTeams.forEach((team, index) => {
                const row = rows[index];
                if (row) {
                    row.style.display = 'table-row';
                    row.style.animationDelay = `${index * 0.05}s`;
                    row.classList.add('fade-in-row');
                }
            });

            for (let i = this.filteredTeams.length; i < rows.length; i++) {
                rows[i].style.display = 'none';
            }

            tbody.style.opacity = '1';
        }, 200);
    }

    setupTableInteractions() {
        // Implementação similar à Série A
        const table = document.querySelector('table');
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.classList.add('highlighted');
            });

            row.addEventListener('mouseleave', () => {
                row.classList.remove('highlighted');
            });

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
    new SerieBPage();
});

// Exportar para uso global se necessário
if (typeof window !== 'undefined') {
    window.SerieBPage = SerieBPage;
}