document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('idols-list-container');
    if (!container) return;

    fetch('json/tabelas/idolos.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            data.forEach(idol => {
                container.innerHTML += `<div class="idolo-card stagger-item"><div class="idolo-image"><img src="${idol.imageUrl}" alt="${idol.name}" loading="lazy" /></div><div class="idolo-info"><h3>${idol.name}</h3><span class="idolo-clube">${idol.club}</span><p class="idolo-descricao">${idol.description}</p><a href="modelos/modelo-idolo.html?id=${idol.id}" class="idolo-link">Ver mais →</a></div></div>`;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar ídolos:', error);
            container.innerHTML = '<p>Erro ao carregar os ídolos.</p>';
        });
});