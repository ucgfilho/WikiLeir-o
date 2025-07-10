document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    // Busca o JSON da história e cria a linha do tempo na página.
    fetch('json/tabelas/historia.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            data.forEach(item => {
                container.innerHTML += `<div class="timeline-item"><div class="timeline-year">${item.year}</div><div class="timeline-content"><h3>${item.title}</h3><p>${item.description}</p></div></div>`;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar história:', error);
            container.innerHTML = '<p>Erro ao carregar a história.</p>';
        });
});