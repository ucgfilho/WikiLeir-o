document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('competitions-grid-container');
    if (!container) return;

    // Busca o JSON de competições e cria os cards na página.
    fetch('json/tabelas/competicoes.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            data.forEach(category => {
                const categorySection = document.createElement('div');
                categorySection.className = 'categoria-section';

                let itemsHtml = '';
                category.items.forEach(comp => {
                    let infoHtml = '';
                    for (const key in comp.info) {
                        infoHtml += `<p><strong>${key}:</strong> ${comp.info[key]}</p>`;
                    }
                    itemsHtml += `<div class="competicao-card"><div class="competicao-header"><h3>${comp.name}</h3><span class="competicao-status ${comp.status}">${comp.status}</span></div><div class="competicao-info">${infoHtml}</div><p class="competicao-descricao">${comp.description}</p></div>`;
                });

                categorySection.innerHTML = `
                    <h2 class="categoria-title">${category.category}</h2>
                    <div class="competicoes-cards">
                        ${itemsHtml}
                    </div>
                `;
                container.appendChild(categorySection);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar competições:', error);
            container.innerHTML = '<p>Erro ao carregar as competições.</p>';
        });
});