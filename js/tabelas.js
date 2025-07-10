document.addEventListener('DOMContentLoaded', () => {
    const pageType = document.body.dataset.pageType;
    if (!pageType) return;

    let jsonPath = '';
    let container;
    let builderFunction;
    let isCategorized = false;

    switch (pageType) {
        case 'serie-a':
        case 'serie-b':
            jsonPath = `json/tabelas/${pageType.split('-')[1]}.json`;
            container = document.getElementById('team-list-container');
            builderFunction = buildTeamRow;
            break;
        case 'idolos':
            jsonPath = 'json/tabelas/idolos.json';
            container = document.getElementById('idols-list-container');
            builderFunction = buildIdolCard;
            break;
        case 'estadios':
            jsonPath = 'json/tabelas/estadios.json';
            container = document.getElementById('stadium-list-container');
            builderFunction = buildStadiumCard;
            break;
        case 'competicoes':
            jsonPath = 'json/tabelas/competicoes.json';
            container = document.getElementById('competitions-grid-container');
            builderFunction = buildCompetitionCard;
            isCategorized = true;
            break;
        case 'recordes':
            jsonPath = 'json/tabelas/recordes.json';
            container = document.getElementById('records-grid-container');
            builderFunction = buildRecordCard;
            isCategorized = true;
            break;
        case 'historia':
            jsonPath = 'json/tabelas/historia.json';
            container = document.getElementById('timeline-container');
            builderFunction = buildTimelineItem;
            break;
    }

    if (!container) return;

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) throw new Error(`Arquivo não encontrado: ${jsonPath}`);
            return response.json();
        })
        .then(data => {
            container.innerHTML = '';
            if (isCategorized) {
                // Para dados que têm categorias (competições, recordes)
                data.forEach(category => {
                    const categorySection = document.createElement('div');
                    categorySection.className = 'categoria-section';

                    let itemsHtml = '';
                    category.items.forEach(item => {
                        itemsHtml += builderFunction(item);
                    });

                    categorySection.innerHTML = `
                        <h2 class="categoria-title">${category.category}</h2>
                        <div class="${pageType === 'competicoes' ? 'competicoes-cards' : 'recordes-cards'}">
                            ${itemsHtml}
                        </div>
                    `;
                    container.appendChild(categorySection);
                });
            } else {
                // Para dados que são uma lista simples
                data.forEach(item => {
                    container.innerHTML += builderFunction(item);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao construir a lista:', error);
            container.innerHTML = `<p style="color: red; text-align: center;">Erro ao carregar o conteúdo. Verifique o console (F12).</p>`;
        });
});

// --- FUNÇÕES DE CONSTRUÇÃO ---

function buildTeamRow(team) {
    return `<tr><td><a href="modelos/modelo-time.html?id=${team.id}"><img src="${team.logoUrl}" width="30" alt="Escudo do ${team.name}"> ${team.name}</a></td><td>${team.stadium}</td><td>${team.capacity}</td><td>${team.mascot}</td></tr>`;
}

function buildIdolCard(idol) {
    return `<div class="idolo-card stagger-item"><div class="idolo-image"><img src="${idol.imageUrl}" alt="${idol.name}" loading="lazy" /></div><div class="idolo-info"><h3>${idol.name}</h3><span class="idolo-clube">${idol.club}</span><p class="idolo-descricao">${idol.description}</p><a href="modelos/modelo-idolo.html?id=${idol.id}" class="idolo-link">Ver mais →</a></div></div>`;
}

function buildStadiumCard(stadium) {
    const teamTags = stadium.teams.map(team => `<span class="time-tag">${team}</span>`).join('');
    return `<div class="estadio-card stagger-item"><div class="estadio-image"><img src="${stadium.imageUrl}" alt="${stadium.name}" loading="lazy" /></div><div class="estadio-info"><h3>${stadium.name}</h3><div class="estadio-details"><span class="capacidade">${stadium.capacity}</span><span class="cidade">${stadium.location}</span></div><div class="estadio-times">${teamTags}</div><p class="estadio-descricao">${stadium.description}</p><a href="modelos/modelo-estadio.html?id=${stadium.id}" class="estadio-link">Ver mais →</a></div></div>`;
}

function buildCompetitionCard(comp) {
    let infoHtml = '';
    for (const key in comp.info) {
        infoHtml += `<p><strong>${key}:</strong> ${comp.info[key]}</p>`;
    }
    return `<div class="competicao-card"><div class="competicao-header"><h3>${comp.name}</h3><span class="competicao-status ${comp.status}">${comp.status}</span></div><div class="competicao-info">${infoHtml}</div><p class="competicao-descricao">${comp.description}</p></div>`;
}

function buildRecordCard(rec) {
    const destaqueClass = rec.highlight ? 'destaque' : '';
    return `<div class="recorde-card ${destaqueClass}"><div class="recorde-numero">${rec.number}</div><div class="recorde-titulo">${rec.title}</div><div class="recorde-subtitulo">${rec.subtitle}</div><p class="recorde-descricao">${rec.description}</p></div>`;
}

function buildTimelineItem(item) {
    return `<div class="timeline-item"><div class="timeline-year">${item.year}</div><div class="timeline-content"><h3>${item.title}</h3><p>${item.description}</p></div></div>`;
}