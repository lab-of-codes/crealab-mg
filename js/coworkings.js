// js/coworkings.js

let toastTimeoutId = null;

function mostrarToastEspacoBloqueado() {
  const wrapper = document.getElementById('toast-espaco-bloqueado');
  const inner = document.getElementById('toast-espaco-bloqueado-inner');
  if (!wrapper || !inner) return;

  
  wrapper.classList.remove('hidden');

 
  void inner.offsetWidth;

 
  inner.classList.remove('opacity-0', 'translate-y-3');
  inner.classList.add('opacity-100', 'translate-y-0');

  
  if (toastTimeoutId) clearTimeout(toastTimeoutId);


  toastTimeoutId = setTimeout(() => {
    inner.classList.remove('opacity-100', 'translate-y-0');
    inner.classList.add('opacity-0', 'translate-y-3');

    
    setTimeout(() => {
      wrapper.classList.add('hidden');
    }, 300);
  }, 3000);
}

function formatarTelefoneBrasil(telefoneBruto) {
  if (!telefoneBruto) return '';

  const digits = telefoneBruto.replace(/\D/g, '');

  
  if (digits.length === 11) {
    const ddd = digits.slice(0, 2);
    const parte1 = digits.slice(2, 7);
    const parte2 = digits.slice(7);
    return `(${ddd}) ${parte1}-${parte2}`;
  }

  
  if (digits.length === 10) {
    const ddd = digits.slice(0, 2);
    const parte1 = digits.slice(2, 6);
    const parte2 = digits.slice(6);
    return `(${ddd}) ${parte1}-${parte2}`;
  }

  
  if (digits.length === 9) {
    const parte1 = digits.slice(0, 5);
    const parte2 = digits.slice(5);
    return `${parte1}-${parte2}`;
  }

  
  if (digits.length === 8) {
    const parte1 = digits.slice(0, 4);
    const parte2 = digits.slice(4);
    return `${parte1}-${parte2}`;
  }

  
  return telefoneBruto;
}


function formatarEndereco(instalacao) {
  const e = instalacao.endereco || {};
  const cidade = e.cidade || {};
  const estado = cidade.estado || {};

  const partes = [
    e.endereco,
    e.numero,
    e.bairro,
    cidade.nome,
    estado.sigla,
  ].filter(Boolean); 

  return partes.join(', ');
}


function criarCardInstalacao(instalacao) {
  const card = document.createElement('div');
  card.className =
    'bg-white rounded-2xl shadow-lg flex flex-col transition-transform duration-300 hover:-translate-y-2 p-4';

  const nome =
    instalacao?.nomeFantasia || instalacao?.razaoSocial || 'Espaço';

  const telefoneBruto = instalacao?.telefone;
const telefone =
  formatarTelefoneBrasil(telefoneBruto) || '(00) 00000-0000';
  const endereco = formatarEndereco(instalacao) || 'Endereço não informado';
  const imagem =
    instalacao?.capa || instalacao?.logo || 'https://placehold.co/400x300/EAEAEA/333333?text=Espa%C3%A7o';

  card.innerHTML = `
    <img src="${imagem}" alt="Imagem do ${nome}"
        class="w-full h-36 object-cover rounded-xl">
    <div class="pt-5 flex flex-col flex-grow">
        <h3 class="font-bold text-xl text-theme-pink mb-4">${nome}</h3>
        <ul class="space-y-3 text-sm text-gray-500 mb-5 flex-grow">
            <li class="flex items-start gap-2.5">
                <svg class="w-4 h-4 mt-0.5 text-theme-pink flex-shrink-0" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                    </path>
                </svg>
                <span>${telefone}</span>
            </li>
            <li class="flex items-start gap-2.5">
                <svg class="w-4 h-4 mt-0.5 text-theme-pink flex-shrink-0" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM12 11a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                </svg>
                <span>${endereco}</span>
            </li>
            ${
              instalacao.infoAdicional
                ? `
            <li class="flex items-start gap-2.5">
                <svg class="w-4 h-4 mt-0.5 text-theme-pink flex-shrink-0" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${instalacao.infoAdicional}</span>
            </li>
            `
                : ''
            }
        </ul>
        <a
            href="#"
            data-toast-reservar="true"
            class="mt-auto text-center w-full border-2 border-theme-pink text-theme-pink font-bold py-2 px-4 rounded-full hover:bg-theme-pink hover:text-white transition-colors duration-300"
        >
            Reservar &rarr;
        </a>
    </div>
  `;

  const link = card.querySelector('a');
  if (link) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      mostrarToastEspacoBloqueado();
    });
  }

  return card;
}


async function carregarCoworkings() {
  const grid = document.getElementById('coworkings-grid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="col-span-1 sm:col-span-2 lg:col-span-4 text-center text-gray-500">
      Carregando espaços...
    </div>
  `;

  try {
    const instalacoes = await tahvagoGetInstalacoes();

    grid.innerHTML = '';

    if (!instalacoes || !instalacoes.length) {
      grid.innerHTML = `
        <div class="col-span-1 sm:col-span-2 lg:col-span-4 text-center text-gray-500">
          Nenhum espaço encontrado.
        </div>
      `;
      return;
    }

    instalacoes.forEach((instalacao) => {
      const card = criarCardInstalacao(instalacao);
      grid.appendChild(card);
    });
  } catch (erro) {
    console.error(erro);
    grid.innerHTML = `
      <div class="col-span-1 sm:col-span-2 lg:col-span-4 text-center text-red-600">
        Erro ao carregar os espaços. Verifique a chave da API ou tente novamente mais tarde.
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', carregarCoworkings);
