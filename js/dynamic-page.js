document.addEventListener('DOMContentLoaded', () => {
    const pageType = document.body.dataset.pageType;
    if (!pageType) {
        console.error('Tipo de página (data-page-type) não definido no body.');
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        handleError(`ID do item não encontrado na URL para a página do tipo '${pageType}'.`);
        return;
    }

    const jsonPath = `json/${pageType}s/${id}.json`;

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                // Se o arquivo não for encontrado, lança um erro específico.
                throw new Error(`Arquivo não encontrado: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Tenta popular a página e captura erros que possam ocorrer durante o processo
            try {
                switch (pageType) {
                    case 'time':
                        populateTeamPage(data);
                        break;
                    case 'idolo':
                        populateIdolPage(data);
                        break;
                    case 'estadio':
                        populateStadiumPage(data);
                        break;
                }
            } catch (populationError) {
                console.error('Erro ao popular a página com os dados:', populationError);
                handleError('Ocorreu um erro ao processar os dados do item.');
            }
        })
        .catch(fetchError => {
            // Captura erros de rede ou de arquivo não encontrado
            console.error('Erro de fetch:', fetchError.message);
            handleError('O conteúdo que você procura não foi encontrado. Verifique o endereço e tente novamente.');
        });
});

/**
 * Preenche a página de um TIME com os dados do JSON.
 * @param {object} data - Os dados do time.
 */
function populateTeamPage(data) {
    document.title = `${data.name} | WikiLeirão`;
    document.getElementById('logo').src = data.logoUrl;
    document.getElementById('logo').alt = `Escudo do ${data.name}`;
    document.getElementById('fullName').textContent = data.fullName;
    document.getElementById('founded').textContent = `Fundado: ${data.founded}`;
    document.getElementById('stadium').textContent = `Estádio: ${data.stadium}`;
    document.getElementById('mascot').textContent = `Mascote: ${data.mascot}`;
    document.getElementById('nickname').textContent = `Apelido: ${data.nickname}`;

    const contentContainer = document.getElementById('dynamic-content');
    contentContainer.innerHTML = '';

    const createTrophySection = (title, items) => {
        if (!items || items.length === 0) return '';
        return `
            <div class="secao-time">
                <h2 class="titulo-secao">${title}</h2>
                <div class="lista-trofeus">
                    ${items.map(item => `
                        <div class="item-trofeu">
                            <span>${item.name}</span>
                            <span>${item.years || ''}</span>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    };

    contentContainer.innerHTML += createTrophySection('Títulos Nacionais', data.titles.national);
    contentContainer.innerHTML += createTrophySection('Títulos Internacionais', data.titles.international);
    contentContainer.innerHTML += createTrophySection('Títulos Estaduais', data.titles.state);

    if (data.idols && data.idols.length > 0) {
        contentContainer.innerHTML += `
            <div class="secao-time secao-idolo">
                <h2 class="titulo-secao">Maiores Ídolos</h2>
                ${data.idols.map(idol => `<h3>${idol.name}</h3><p>${idol.description}</p>`).join('')}
            </div>`;
    }

    if (data.curiosities && data.curiosities.length > 0) {
        contentContainer.innerHTML += `
            <div class="secao-time">
                <h2 class="titulo-secao">Curiosidades</h2>
                <ul>${data.curiosities.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>`;
    }
}

/**
 * Preenche a página de um ÍDOLO com os dados do JSON.
 * @param {object} data - Os dados do ídolo.
 */
function populateIdolPage(data) {
    document.title = `${data.name} | WikiLeirão`;
    document.getElementById('item-image').src = data.imageUrl;
    document.getElementById('item-image').alt = data.fullName;
    document.getElementById('fullName').textContent = data.fullName;
    document.getElementById('birthDate').textContent = `Nascimento: ${data.birthDate}`;
    document.getElementById('club').textContent = `Clube: ${data.club}`;
    document.getElementById('position').textContent = `Posição: ${data.position}`;
    document.getElementById('nickname').textContent = `Apelido: ${data.nickname}`;

    const contentContainer = document.getElementById('dynamic-content');
    contentContainer.innerHTML = '';

    if (!data.sections || data.sections.length === 0) return;

    data.sections.forEach(section => {
        let sectionHtml = `<div class="secao-time ${section.type === 'custom' ? 'secao-idolo' : ''}">`;
        sectionHtml += `<h2 class="titulo-secao">${section.title}</h2>`;

        if (section.type === 'list') {
            sectionHtml += `<ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        } else if (section.type === 'trophies') {
            sectionHtml += `<div class="lista-trofeus">${section.items.map(item => `
                <div class="item-trofeu">
                    <span>${item.name}</span>
                    <span>${item.years}</span>
                </div>`).join('')}</div>`;
        } else if (section.type === 'custom') {
            sectionHtml += section.html;
        }

        sectionHtml += '</div>';
        contentContainer.innerHTML += sectionHtml;
    });
}

/**
 * Preenche a página de um ESTÁDIO com os dados do JSON.
 * @param {object} data - Os dados do estádio.
 */
function populateStadiumPage(data) {
    document.title = `${data.name} | WikiLeirão`;
    document.getElementById('item-image').src = data.imageUrl;
    document.getElementById('item-image').alt = data.name;
    document.getElementById('name').textContent = data.fullName;
    document.getElementById('inauguration').textContent = `Inauguração: ${data.inauguration}`;
    document.getElementById('capacity').textContent = `Capacidade: ${data.capacity}`;
    document.getElementById('location').textContent = `Localização: ${data.location}`;
    document.getElementById('nickname').textContent = `Apelido: ${data.nickname}`;

    const contentContainer = document.getElementById('dynamic-content');
    contentContainer.innerHTML = '';

    if (!data.sections || data.sections.length === 0) return;

    data.sections.forEach(section => {
        let sectionHtml = `<div class="secao-time ${section.type === 'custom' ? 'secao-idolo' : ''}">`;
        sectionHtml += `<h2 class="titulo-secao">${section.title}</h2>`;

        if (section.type === 'list') {
            sectionHtml += `<ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        } else if (section.type === 'trophies') {
            sectionHtml += `<div class="lista-trofeus">${section.items.map(item => `
                <div class="item-trofeu">
                    <span>${item.name}</span>
                    <span>${item.years}</span>
                </div>`).join('')}</div>`;
        } else if (section.type === 'custom') {
            sectionHtml += section.html;
        }

        sectionHtml += '</div>';
        contentContainer.innerHTML += sectionHtml;
    });
}

/**
 * Exibe uma mensagem de erro na página.
 * @param {string} message - A mensagem de erro a ser exibida.
 */
function handleError(message) {
    const container = document.querySelector('main.container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem 1rem; color: white;">
                <h1 class="titulo-pagina" style="font-size: 3rem;">Erro 404</h1>
                <p style="font-size: 1.2rem; opacity: 0.8;">${message}</p>
                <a href="WikiLeirão.html" style="display: inline-block; margin-top: 2rem; padding: 0.8rem 1.5rem; background-color: var(--cor-acento); color: var(--texto-escuro); text-decoration: none; border-radius: 5px; font-weight: 600;">Voltar para a Home</a>
            </div>
        `;
    }
}