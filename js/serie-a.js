// WikiLeirão - Série A Page JavaScript
class SerieAPage {
    constructor() {
        this.teams = [];
        this.filteredTeams = [];
        this.currentSort = { column: null, direction: 'asc' };
        this.init();
    }

    init() {
        this.setupTableInteractions();
        this.setupSearch();
        this.setupFilters();
        this.setupTableAnimations();
        this.setupTooltips();
        this.setupResponsiveTable();
        this.loadTeamsData();
    }

    // Carregar dados dos times
    loadTeamsData() {
        if (window.teamsDatabase) {
            this.teams = window.teamsDatabase.filter(team => team.serie === 'A');
            this.filteredTeams = [...this.teams];
            this.updateTableStats();
        }
    }

    // Interações da tabela
    setupTableInteractions() {
        const table = document.querySelector('table');
        if (!table) return;

        // Hover effects nas linhas
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.classList.add('highlighted');
                this.showRowPreview(row);
            });
            
            row.addEventListener('mouseleave', () => {
                row.classList.remove('highlighted');
                this.hideRowPreview();
            });

            // Click para ir para página do time
            row.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    const link = row.querySelector('a');
                    if (link) {
                        window.location.href = link.href;
                    }
                }
            });
        });

        // Ordenação por colunas
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            if (index > 0) { // Pular a primeira coluna (logo + nome)
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => {
                    this.sortTable(index, header);
                });
            }
        });
    }

    // Sistema de busca avançado
    setupSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container-page';
        searchContainer.innerHTML = `
            <div class="search-wrapper">
                <input type="text" 
                       id="team-search" 
                       placeholder="Buscar time por nome, cidade, estádio..." 
                       autocomplete="off" />
                <div class="search-filters">
                    <select id="region-filter">
                        <option value="">Todas as regiões</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="PR">Paraná</option>
                        <option value="CE">Ceará</option>
                        <option value="BA">Bahia</option>
                        <option value="PE">Pernambuco</option>
                    </select>
                    <button id="clear-filters">Limpar</button>
                </div>
            </div>
        `;

        const main = document.querySelector('main');
        const title = main.querySelector('.titulo-pagina');
        title.insertAdjacentElement('afterend', searchContainer);

        // Event listeners
        const searchInput = document.getElementById('team-search');
        const regionFilter = document.getElementById('region-filter');
        const clearButton = document.getElementById('clear-filters');

        searchInput.addEventListener('input', Utils.debounce(() => {
            this.filterTeams();
        }, 300));

        regionFilter.addEventListener('change', () => {
            this.filterTeams();
        });

        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            regionFilter.value = '';
            this.filterTeams();
        });
    }

    // Filtrar times
    filterTeams() {
        const searchTerm = document.getElementById('team-search').value.toLowerCase();
        const regionFilter = document.getElementById('region-filter').value;

        this.filteredTeams = this.teams.filter(team => {
            const matchesSearch = !searchTerm || 
                team.name.toLowerCase().includes(searchTerm) ||
                team.city.toLowerCase().includes(searchTerm) ||
                team.stadium.toLowerCase().includes(searchTerm) ||
                team.nickname.some(nick => nick.toLowerCase().includes(searchTerm));

            const matchesRegion = !regionFilter || team.state === regionFilter;

            return matchesSearch && matchesRegion;
        });

        this.updateTableDisplay();
        this.updateTableStats();
    }

    // Atualizar exibição da tabela
    updateTableDisplay() {
        const tbody = document.querySelector('tbody');
        if (!tbody) return;

        // Fade out
        tbody.style.opacity = '0.5';

        setTimeout(() => {
            const rows = tbody.querySelectorAll('tr');
            
            this.filteredTeams.forEach((team, index) => {
                const row = rows[index];
                if (row) {
                    row.style.display = 'table-row';
                    row.style.animationDelay = `${index * 0.05}s`;
                    row.classList.add('fade-in-row');
                } else {
                    // Criar nova linha se necessário
                    this.createTableRow(team, tbody);
                }
            });

            // Esconder linhas extras
            for (let i = this.filteredTeams.length; i < rows.length; i++) {
                rows[i].style.display = 'none';
            }

            // Fade in
            tbody.style.opacity = '1';
        }, 200);
    }

    // Ordenar tabela
    sortTable(columnIndex, header) {
        const column = this.getColumnName(columnIndex);
        
        if (this.currentSort.column === column) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.column = column;
            this.currentSort.direction = 'asc';
        }

        // Atualizar indicadores visuais
        document.querySelectorAll('th').forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
        });
        
        header.classList.add(`sort-${this.currentSort.direction}`);

        // Ordenar dados
        this.filteredTeams.sort((a, b) => {
            let valueA = this.getColumnValue(a, column);
            let valueB = this.getColumnValue(b, column);

            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (this.currentSort.direction === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });

        this.updateTableDisplay();
    }

    getColumnName(index) {
        const columns = ['team', 'founded', 'stadium', 'capacity', 'mascot', 'idol', 'titles'];
        return columns[index] || 'team';
    }

    getColumnValue(team, column) {
        switch (column) {
            case 'founded': return team.founded || 0;
            case 'stadium': return team.stadium || '';
            case 'capacity': return this.extractCapacity(team.stadium) || 0;
            case 'mascot': return team.mascot || '';
            default: return team.name || '';
        }
    }

    extractCapacity(stadiumText) {
        const match = stadiumText.match(/(\d+\.?\d*)/);
        return match ? parseInt(match[1].replace('.', '')) : 0;
    }

    // Animações da tabela
    setupTableAnimations() {
        const tbody = document.querySelector('tbody');
        if (!tbody) return;

        // Animação de entrada das linhas
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                row.style.transition = 'all 0.4s ease-out';
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }

    // Tooltips para informações dos ídolos
    setupTooltips() {
        const idolCells = document.querySelectorAll('td[data-info]');
        
        idolCells.forEach(cell => {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = cell.dataset.info;
            document.body.appendChild(tooltip);

            cell.addEventListener('mouseenter', (e) => {
                tooltip.style.display = 'block';
                this.positionTooltip(e, tooltip);
                tooltip.style.opacity = '1';
            });

            cell.addEventListener('mousemove', (e) => {
                this.positionTooltip(e, tooltip);
            });

            cell.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    tooltip.style.display = 'none';
                }, 200);
            });
        });
    }

    positionTooltip(e, tooltip) {
        const x = e.clientX + 10;
        const y = e.clientY - 10;
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    // Responsividade da tabela
    setupResponsiveTable() {
        const table = document.querySelector('table');
        const container = document.querySelector('.container-tabela');
        
        if (!table || !container) return;

        // Adicionar indicador de scroll horizontal
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '← Deslize para ver mais →';
        container.appendChild(scrollIndicator);

        // Mostrar/esconder indicador baseado no scroll
        container.addEventListener('scroll', () => {
            const isScrollable = container.scrollWidth > container.clientWidth;
            const isAtEnd = container.scrollLeft >= (container.scrollWidth - container.clientWidth - 10);
            
            if (isScrollable && !isAtEnd) {
                scrollIndicator.style.opacity = '1';
            } else {
                scrollIndicator.style.opacity = '0';
            }
        });

        // Verificar se precisa do indicador
        window.addEventListener('resize', () => {
            const isScrollable = container.scrollWidth > container.clientWidth;
            scrollIndicator.style.display = isScrollable ? 'block' : 'none';
        });
    }

    // Preview da linha
    showRowPreview(row) {
        const teamName = row.querySelector('a').textContent.trim();
        const preview = document.createElement('div');
        preview.className = 'row-preview';
        preview.innerHTML = `
            <div class="preview-content">
                <strong>${teamName}</strong>
                <span>Clique para ver mais detalhes</span>
            </div>
        `;
        
        document.body.appendChild(preview);
        
        setTimeout(() => {
            preview.style.opacity = '1';
        }, 10);
    }

    hideRowPreview() {
        const preview = document.querySelector('.row-preview');
        if (preview) {
            preview.style.opacity = '0';
            setTimeout(() => {
                preview.remove();
            }, 200);
        }
    }

    // Estatísticas da tabela
    updateTableStats() {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'table-stats';
        statsContainer.innerHTML = `
            <div class="stats-item">
                <span class="stats-number">${this.filteredTeams.length}</span>
                <span class="stats-label">Times encontrados</span>
            </div>
            <div class="stats-item">
                <span class="stats-number">${this.teams.length}</span>
                <span class="stats-label">Total na Série A</span>
            </div>
        `;

        // Remover stats anterior se existir
        const existingStats = document.querySelector('.table-stats');
        if (existingStats) {
            existingStats.remove();
        }

        const searchContainer = document.querySelector('.search-container-page');
        if (searchContainer) {
            searchContainer.appendChild(statsContainer);
        }
    }
}

// Utilitários específicos da página
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
    new SerieAPage();
});

// Exportar para uso global se necessário
if (typeof window !== 'undefined') {
    window.SerieAPage = SerieAPage;
}