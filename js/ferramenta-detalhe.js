// js/ferramenta-detalhe.js

let ferramentaAtual = null;

let toastInscricaoTimeoutId = null;

function mostrarToastInscricaoSucesso() {
  const wrapper = document.getElementById('toast-inscricao');
  const inner = document.getElementById('toast-inscricao-inner');
  if (!wrapper || !inner) return;

  
  wrapper.classList.remove('hidden');

  
  void inner.offsetWidth;

  inner.classList.remove('opacity-0', 'translate-y-3');
  inner.classList.add('opacity-100', 'translate-y-0');

  if (toastInscricaoTimeoutId) clearTimeout(toastInscricaoTimeoutId);

  toastInscricaoTimeoutId = setTimeout(() => {
    inner.classList.remove('opacity-100', 'translate-y-0');
    inner.classList.add('opacity-0', 'translate-y-3');

    setTimeout(() => {
      wrapper.classList.add('hidden');
    }, 300);
  }, 3000);
}


function obterFerramentaPorSlug(slug) {
  if (!window.FERRAMENTAS) return null;
  return FERRAMENTAS.find((f) => f.slug === slug);
}

function preencherPagina(f) {
  document.getElementById("breadcrumb-nome").textContent = f.nome;
  document.getElementById("ferramenta-nome").textContent = f.nome;
  document.getElementById("ferramenta-descricao").textContent =
    f.descricao || "";
  document.getElementById("ferramenta-publico").textContent =
    f.publicoAlvo || "—";
  document.getElementById("ferramenta-categoria").textContent =
    f.categoria || "—";
  document.getElementById("ferramenta-condicoes").textContent =
    f.condicoes || "";
/*   document.getElementById("ferramenta-caracteristicas").textContent =
    f.caracteristicas || ""; */

  const logoEl = document.getElementById("ferramenta-logo");
  if (f.logo) {
    logoEl.src = f.logo;
    logoEl.alt = `Logo ${f.nome}`;
  }

  document.getElementById("modal-beneficio").textContent =
    f.beneficioSelecionado || f.nome;
}

function abrirModal() {
  const modal = document.getElementById("modal-backdrop");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function fecharModal() {
  const modal = document.getElementById("modal-backdrop");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

document.addEventListener("DOMContentLoaded", () => {
 
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  ferramentaAtual = obterFerramentaPorSlug(slug);

  if (!ferramentaAtual) {
   
    document.getElementById("ferramenta-nome").textContent =
      "Ferramenta não encontrada";
    return;
  }

  preencherPagina(ferramentaAtual);

  
  const btnAbrir = document.getElementById("btn-abrir-modal");
  const btnFechar = document.getElementById("modal-fechar");
  const btnCancelar = document.getElementById("btn-cancelar");
  const backdrop = document.getElementById("modal-backdrop");
  const form = document.getElementById("form-inscricao");

  btnAbrir.addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal();
  });

  btnFechar.addEventListener("click", (e) => {
    e.preventDefault();
    fecharModal();
  });

  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    fecharModal();
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      fecharModal();
    }
  });

 
  form.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const telefone = form.telefone.value.trim();
  const observacoes = form.observacoes.value.trim();
  const beneficio = document.getElementById('modal-beneficio').textContent;
  const ferramentaNome = ferramentaAtual?.nome || '';
  const ferramentaEmail = ferramentaAtual?.email || '';

  const templateParams = {
    beneficio,
    ferramenta: ferramentaNome,
    nome,
    email,
    telefone,
    observacoes,
    link_ferramenta: window.location.href, 
    email_extra: ferramentaEmail,
  };

  emailjs
    .send('service_creamg', 'template_creamg', templateParams)
    .then(() => {
      mostrarToastInscricaoSucesso(); 
      form.reset();
      fecharModal();
    })
    .catch((error) => {
      console.error('Erro no EmailJS:', error);
      alert('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Enviar inscrição';
    });
});

});


