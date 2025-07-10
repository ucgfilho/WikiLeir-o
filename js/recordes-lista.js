document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('records-grid-container');
    if (!container) return;

    // Busca o JSON de recordes e cria os cards na página.
    fetch('json/tabelas/recordes.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            data.forEach(category => {
                const categorySection = document.createElement('div');
                categorySection.className = 'categoria-section';

                let itemsHtml = '';
                category.items.forEach(rec => {
                    const destaqueClass = rec.highlight ? 'destaque' : '';
                    itemsHtml += `<div class="recorde-card ${destaqueClass}"><div class="recorde-numero">${rec.number}</div><div class="recorde-titulo">${rec.title}</div><div class="recorde-subtitulo">${rec.subtitle}</div><p class="recorde-descricao">${rec.description}</p></div>`;
                });

                categorySection.innerHTML = `
                    <h2 class="categoria-title">${category.category}</h2>
                    <div class="recordes-cards">
                        ${itemsHtml}
                    </div>
                `;
                container.appendChild(categorySection);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar recordes:', error);
            container.innerHTML = '<p>Erro ao carregar os recordes.</p>';
        });
});