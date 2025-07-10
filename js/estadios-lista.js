document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('stadium-list-container');
    if (!container) return;

    fetch('json/tabelas/estadios.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            data.forEach(stadium => {
                const teamTags = stadium.teams.map(team => `<span class="time-tag">${team}</span>`).join('');
                container.innerHTML += `<div class="estadio-card stagger-item"><div class="estadio-image"><img src="${stadium.imageUrl}" alt="${stadium.name}" loading="lazy" /></div><div class="estadio-info"><h3>${stadium.name}</h3><div class="estadio-details"><span class="capacidade">${stadium.capacity}</span><span class="cidade">${stadium.location}</span></div><div class="estadio-times">${teamTags}</div><p class="estadio-descricao">${stadium.description}</p><a href="modelos/modelo-estadio.html?id=${stadium.id}" class="estadio-link">Ver mais →</a></div></div>`;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar estádios:', error);
            container.innerHTML = '<p>Erro ao carregar os estádios.</p>';
        });
});