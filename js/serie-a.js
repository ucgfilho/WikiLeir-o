document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('team-list-container');
    if (!container) return;

    // Busca o JSON da Série A e preenche a tabela de times.
    fetch('json/tabelas/a.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            data.forEach(team => {
                container.innerHTML += `<tr><td><a href="modelos/modelo-time.html?id=${team.id}"><img src="${team.logoUrl}" width="30" alt="Escudo do ${team.name}"> ${team.name}</a></td><td>${team.stadium}</td><td>${team.capacity}</td><td>${team.mascot}</td></tr>`;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar times da Série A:', error);
            container.innerHTML = '<tr><td colspan="4">Erro ao carregar os times.</td></tr>';
        });
});