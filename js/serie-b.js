document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('team-list-container');
    if (!container) return;

    fetch('json/tabelas/b.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            data.forEach(team => {
                container.innerHTML += `<tr><td><a href="modelos/modelo-time.html?id=${team.id}"><img src="${team.logoUrl}" width="30" alt="Escudo do ${team.name}"> ${team.name}</a></td><td>${team.stadium}</td><td>${team.capacity}</td><td>${team.mascot}</td></tr>`;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar times da Série B:', error);
            container.innerHTML = '<tr><td colspan="4">Erro ao carregar os times.</td></tr>';
        });
});