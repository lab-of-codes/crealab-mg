// js/ferramentas.js

function criarCardFerramenta(ferramenta) {
  const card = document.createElement('div');
  card.className =
    'bg-[#e6f2ff] rounded-3xl p-3 sm:p-4 flex flex-col h-full';

  const logo = ferramenta.logo ||
    'https://placehold.co/400x300/EAEAEA/333333?text=Logo';

  const nome = ferramenta.nome || 'Nome da ferramenta';
  const tipo = ferramenta.tipo || 'Produtos digitais';
  const publicoAlvo =
    ferramenta.publicoAlvo || 'Para profissionais, para estudantes';

  // 👉 link agora vai para a página genérica com o slug
  const linkDetalhes = `ferramenta-detalhe.html?slug=${encodeURIComponent(
    ferramenta.slug
  )}`;

  card.innerHTML = `
    <div class="bg-white rounded-2xl shadow-sm p-3 sm:p-4 flex flex-col h-full">
      <div class="w-full h-32 sm:h-36 rounded-xl overflow-hidden  flex items-center justify-center mb-4">
        <img src="${logo}" alt="Logo ${nome}" class="w-full h-full object-cover">
      </div>

      <div class="flex flex-col flex-grow">
        <h3 class="text-sm sm:text-base font-bold text-theme-blue mb-2">
          ${nome}
        </h3>

        <div class="space-y-1 text-xs sm:text-sm text-theme-primary-main mb-4">
          <div class="flex items-start gap-2">
            <!-- ícone informação -->
            <svg
              class="w-4 h-4 mt-0.5 text-theme-blue flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01
                   M12 22a10 10 0 100-20 10 10 0 000 20z"
              />
            </svg>
            <span>${tipo}</span>
          </div>

          <div class="flex items-start gap-2">
            <!-- ícone pessoa única -->
            <svg
              class="w-4 h-4 mt-0.5 text-theme-blue flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14c-2.21 0-4 1.79-4 4v2
                   m8 0v-2c0-2.21-1.79-4-4-4
                   m0-2a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
            <span>${publicoAlvo}</span>
          </div>
        </div>

        <a
          href="${linkDetalhes}"
          class="mt-auto inline-flex items-center justify-center w-full rounded-full border border-theme-blue text-theme-blue text-xs sm:text-sm font-semibold py-2 px-4 bg-white hover:opacity-80  transition-colors duration-300"
        >
          Ver detalhes
          <svg
            class="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  `;

  return card;
}

function carregarFerramentas() {
  const grid = document.getElementById('ferramentas-grid');
  if (!grid) return;

  grid.innerHTML = '';

  if (!window.FERRAMENTAS || !FERRAMENTAS.length) {
    grid.innerHTML = `
      <div class="col-span-1 sm:col-span-2 lg:col-span-4 text-center text-gray-500">
        Nenhuma ferramenta disponível no momento.
      </div>
    `;
    return;
  }

  FERRAMENTAS.forEach((ferramenta) => {
    const card = criarCardFerramenta(ferramenta);
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', carregarFerramentas);


