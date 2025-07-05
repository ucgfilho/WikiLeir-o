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
                throw new Error(`Arquivo não encontrado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            try {
                // Função genérica para injetar metadados de SEO
                injectSeoData(pageType, data);

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
            console.error('Erro de fetch:', fetchError.message);
            handleError('O conteúdo que você procura não foi encontrado. Verifique o endereço e tente novamente.');
        });
});

/**
 * Injeta Título, Meta Description, Canonical URL e Dados Estruturados (JSON-LD) no <head>.
 * @param {string} pageType - O tipo da página ('time', 'idolo', 'estadio').
 * @param {object} data - Os dados do item carregado do JSON.
 */
function injectSeoData(pageType, data) {
    const head = document.head;

    // 1. Título da Página
    const title = pageType === 'time'
        ? `${data.fullName} | Títulos, Ídolos e História | WikiLeirão`
        : `${data.name || data.fullName} | WikiLeirão`;
    document.title = title;

    // 2. Meta Description
    let description = '';
    if (pageType === 'time') {
        description = `Conheça tudo sobre o ${data.fullName}: seus principais títulos, maiores ídolos, curiosidades e a história do ${data.nickname}.`;
    } else if (pageType === 'idolo') {
        description = `A trajetória de ${data.fullName} (${data.nickname}), ídolo do ${data.club}. Veja seus títulos, recordes e legado no futebol brasileiro.`;
    } else if (pageType === 'estadio') {
        description = `Explore o ${data.name} (${data.nickname}), localizado em ${data.location}. Conheça sua capacidade, história e os grandes jogos que sediou.`;
    }

    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = description;
    head.appendChild(metaDescription);

    // 3. Canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.href;
    head.appendChild(canonical);

    // 4. Dados Estruturados (JSON-LD)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    let schemaData = {};

    if (pageType === 'time') {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            "name": data.fullName,
            "alternateName": data.name,
            "logo": data.logoUrl,
            "sport": "Soccer",
            "foundingDate": data.founded.split(' de ')[2] || '1900', // Pega o ano
            "description": description
        };
    } else if (pageType === 'idolo') {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": data.fullName,
            "alternateName": data.name,
            "description": description,
            "jobTitle": "Jogador de Futebol",
            "image": data.imageUrl
        };
    } else if (pageType === 'estadio') {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "Place",
            "name": data.fullName,
            "alternateName": data.name,
            "description": description,
            "image": data.imageUrl,
            "address": data.location
        };
    }

    script.textContent = JSON.stringify(schemaData);
    head.appendChild(script);
}

// As funções populate (populateTeamPage, populateIdolPage, populateStadiumPage)
// e a função handleError permanecem as mesmas da versão anterior.
// Certifique-se de que elas estão presentes aqui.

function populateTeamPage(data) {
    document.getElementById('logo').src = data.logoUrl;
    document.getElementById('logo').alt = `Escudo do ${data.fullName}`;
    document.getElementById('fullName').textContent = data.fullName;
    document.getElementById('founded').textContent = `Fundado: ${data.founded}`;
    document.getElementById('stadium').textContent = `Estádio: ${data.stadium}`;
    document.getElementById('mascot').textContent = `Mascote: ${data.mascot}`;
    document.getElementById('nickname').textContent = `Apelido: ${data.nickname}`;
    const contentContainer = document.getElementById('dynamic-content');
    contentContainer.innerHTML = '';
    const createTrophySection = (title, items) => {
        if (!items || items.length === 0) return '';
        return `<div class="secao-time"><h2 class="titulo-secao">${title}</h2><div class="lista-trofeus">${items.map(item => `<div class="item-trofeu"><span>${item.name}</span><span>${item.years || ''}</span></div>`).join('')}</div></div>`;
    };
    contentContainer.innerHTML += createTrophySection('Títulos Nacionais', data.titles.national);
    contentContainer.innerHTML += createTrophySection('Títulos Internacionais', data.titles.international);
    contentContainer.innerHTML += createTrophySection('Títulos Estaduais', data.titles.state);
    if (data.idols && data.idols.length > 0) {
        contentContainer.innerHTML += `<div class="secao-time secao-idolo"><h2 class="titulo-secao">Maiores Ídolos</h2>${data.idols.map(idol => `<h3>${idol.name}</h3><p>${idol.description}</p>`).join('')}</div>`;
    }
    if (data.curiosities && data.curiosities.length > 0) {
        contentContainer.innerHTML += `<div class="secao-time"><h2 class="titulo-secao">Curiosidades</h2><ul>${data.curiosities.map(item => `<li>${item}</li>`).join('')}</ul></div>`;
    }
}

function populateIdolPage(data) {
    document.getElementById('item-image').src = data.imageUrl;
    document.getElementById('item-image').alt = `Foto de ${data.fullName}`;
    document.getElementById('fullName').textContent = data.fullName;
    document.getElementById('birthDate').textContent = `Nascimento: ${data.birthDate}`;
    document.getElementById('club').textContent = `Clube Principal: ${data.club}`;
    document.getElementById('position').textContent = `Posição: ${data.position}`;
    document.getElementById('nickname').textContent = `Apelido: ${data.nickname}`;
    const contentContainer = document.getElementById('dynamic-content');
    contentContainer.innerHTML = '';
    if (!data.sections || data.sections.length === 0) return;
    data.sections.forEach(section => {
        let sectionHtml = `<div class="secao-time ${section.type === 'custom' ? 'secao-idolo' : ''}"><h2 class="titulo-secao">${section.title}</h2>`;
        if (section.type === 'list') {
            sectionHtml += `<ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        } else if (section.type === 'trophies') {
            sectionHtml += `<div class="lista-trofeus">${section.items.map(item => `<div class="item-trofeu"><span>${item.name}</span><span>${item.years}</span></div>`).join('')}</div>`;
        } else if (section.type === 'custom') {
            sectionHtml += section.html;
        }
        sectionHtml += '</div>';
        contentContainer.innerHTML += sectionHtml;
    });
}

function populateStadiumPage(data) {
    document.getElementById('item-image').src = data.imageUrl;
    document.getElementById('item-image').alt = `Foto do ${data.name}`;
    document.getElementById('name').textContent = data.fullName;
    document.getElementById('inauguration').textContent = `Inauguração: ${data.inauguration}`;
    document.getElementById('capacity').textContent = `Capacidade: ${data.capacity}`;
    document.getElementById('location').textContent = `Localização: ${data.location}`;
    document.getElementById('nickname').textContent = `Apelido: ${data.nickname}`;
    const contentContainer = document.getElementById('dynamic-content');
    contentContainer.innerHTML = '';
    if (!data.sections || data.sections.length === 0) return;
    data.sections.forEach(section => {
        let sectionHtml = `<div class="secao-time ${section.type === 'custom' ? 'secao-idolo' : ''}"><h2 class="titulo-secao">${section.title}</h2>`;
        if (section.type === 'list') {
            sectionHtml += `<ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        } else if (section.type === 'trophies') {
            sectionHtml += `<div class="lista-trofeus">${section.items.map(item => `<div class="item-trofeu"><span>${item.name}</span><span>${item.years}</span></div>`).join('')}</div>`;
        } else if (section.type === 'custom') {
            sectionHtml += section.html;
        }
        sectionHtml += '</div>';
        contentContainer.innerHTML += sectionHtml;
    });
}

function handleError(message) {
    const container = document.querySelector('main.container');
    if (container) {
        container.innerHTML = `<div style="text-align: center; padding: 4rem 1rem; color: white;"><h1 class="titulo-pagina" style="font-size: 3rem;">Erro 404</h1><p style="font-size: 1.2rem; opacity: 0.8;">${message}</p><a href="WikiLeirão.html" style="display: inline-block; margin-top: 2rem; padding: 0.8rem 1.5rem; background-color: var(--cor-acento); color: var(--texto-escuro); text-decoration: none; border-radius: 5px; font-weight: 600;">Voltar para a Home</a></div>`;
    }
}