const API = "https://beachmasterpro.onrender.com";

// 1. FUNÇÃO DE LOGIN
function fazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: senha })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("menu").style.display = "flex";
      showTab('eventos'); // Abre a aba de torneios primeiro
      atualizarStatus("Conectado ✅", "green");
    } else {
      alert("Ops! E-mail ou senha errados.");
    }
  });
}

// 2. TROCAR DE ABA (Torneios / Ranking / Lif Kin)
function showTab(tab) {
  // Esconde todas as seções
  document.getElementById("section-eventos").style.display = "none";
  document.getElementById("section-ranking").style.display = "none";
  document.getElementById("section-lifkin").style.display = "none";
  
  // Tira a cor azul de todas as abas
  document.getElementById("tab-ev").classList.remove("active-tab");
  document.getElementById("tab-ra").classList.remove("active-tab");
  document.getElementById("tab-li").classList.remove("active-tab");

  // Mostra a seção escolhida e acende a aba
  if (tab === 'eventos') {
    document.getElementById("section-eventos").style.display = "block";
    document.getElementById("tab-ev").classList.add("active-tab");
    carregarEventos();
  } else if (tab === 'ranking') {
    document.getElementById("section-ranking").style.display = "block";
    document.getElementById("tab-ra").classList.add("active-tab");
  } else if (tab === 'lifkin') {
    document.getElementById("section-lifkin").style.display = "block";
    document.getElementById("tab-li").classList.add("active-tab");
    carregarPosts();
  }
}

// 3. SALVAR TORNEIO
function salvarEvento() {
  const nome = document.getElementById("nomeEv").value;
  const categoria = document.getElementById("catEv").value;

  fetch(API + "/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, categoria })
  }).then(() => {
    document.getElementById("nomeEv").value = "";
    carregarEventos();
  });
}

function carregarEventos() {
  fetch(API + "/events")
    .then(res => res.json())
    .then(eventos => {
      const lista = document.getElementById("listaEventos");
      lista.innerHTML = eventos.map(ev => `
        <div class="card">
          <strong>${ev.nome}</strong><br>
          <small>Categoria: ${ev.categoria}</small>
        </div>
      `).join("");
    });
}

// 4. REDE SOCIAL LIF KIN
function postarLifKin() {
  const texto = document.getElementById("postText").value;
  fetch(API + "/lifkin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conteudo: texto, usuario: "Admin Master" })
  }).then(() => {
    document.getElementById("postText").value = "";
    carregarPosts();
  });
}

function carregarPosts() {
  fetch(API + "/lifkin")
    .then(res => res.json())
    .then(posts => {
      const feed = document.getElementById("feedLifKin");
      feed.innerHTML = posts.map(p => `
        <div class="card" style="border-left-color: var(--neon-blue)">
          <strong>@${p.usuario}</strong><br>
          ${p.conteudo}
        </div>
      `).join("");
    });
}

function atualizarStatus(txt, cor) {
  const s = document.getElementById("status");
  s.innerText = txt;
  s.style.color = cor;
}

// Checar conexão ao abrir
window.onload = () => {
  fetch(API + "/health")
    .then(() => atualizarStatus("Pronto para entrar ✅", "#00f3ff"))
    .catch(() => atualizarStatus("Servidor dormindo... aguarde 1 min ⏳", "orange"));
};
