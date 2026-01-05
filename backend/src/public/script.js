// URL REAL DO BACKEND
const API_URL = "https://beachmasterpro.onrender.com";

// 1. STATUS DO BACKEND (Corrigido para falar com o index.html novo)
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    // Mudamos 'apiStatus' para 'backend-status' para combinar com seu HTML
    const statusElement = document.getElementById("backend-status");
    if (statusElement) {
        statusElement.style.color = "#27ae60"; // Verde profissional
        statusElement.textContent = "Conectado ✅";
        console.log("Backend respondendo:", data);
    }
  })
  .catch((err) => {
    const statusElement = document.getElementById("backend-status");
    if (statusElement) {
        statusElement.style.color = "#c0392b"; // Vermelho de erro
        statusElement.textContent = "Erro de conexão ❌";
    }
    console.error("Falha ao conectar no backend:", err);
  });

// 2. FUNÇÃO DE LOGIN (Nomes ajustados para o seu index.html)
function fazerLogin(event) {
  if (event) event.preventDefault(); // Impede a página de recarregar
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value; // 'senha' com 's' minúsculo conforme o HTML

  fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso!");
        carregarEventos();
      } else {
        alert("Erro: " + (data.message || "Credenciais inválidas"));
      }
    })
    .catch(() => {
      alert("Erro de conexão com o servidor.");
    });
}

// 3. CARREGAR EVENTOS
function carregarEventos() {
  const list = document.getElementById("eventos-lista");
  if (list) list.innerHTML = "<li>Carregando...</li>";

  fetch(API_URL + "/events")
    .then(res => res.json())
    .then(events => {
      if (!list) return;
      list.innerHTML = "";

      if (!events || events.length === 0) {
        list.innerHTML = "<li>Nenhum evento encontrado</li>";
        return;
      }

      events.forEach(e => {
        const li = document.createElement("li");
        li.textContent = e.nome || e.name || "Evento Esportivo";
        list.appendChild(li);
      });
    })
    .catch(() => {
      if (list) list.innerHTML = "<li>Erro ao carregar eventos</li>";
    });
}
