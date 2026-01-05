// URL REAL DO BACKEND
const API_URL = "https://beachmasterpro.onrender.com";

// 1. STATUS DO BACKEND (Verifica a conexão ao carregar a página)
window.addEventListener('DOMContentLoaded', () => {
  const statusElement = document.getElementById("backend-status");
  
  fetch(API_URL + "/health")
    .then(res => res.json())
    .then(data => {
      if (statusElement) {
        statusElement.style.color = "#27ae60"; 
        statusElement.textContent = "Conectado ✅";
      }
    })
    .catch(() => {
      if (statusElement) {
        statusElement.style.color = "#c0392b";
        statusElement.textContent = "Erro de conexão ❌";
      }
    });
    
  // Tentar carregar eventos automaticamente
  carregarEventos();
});

// 2. FUNÇÃO DE LOGIN (Com redirecionamento visual)
function fazerLogin(event) {
  if (event) event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

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
        
        // --- REDIRECIONAMENTO VISUAL ---
        // Muda o conteúdo da página para o Painel de Controle
        document.body.innerHTML = `
          <div style="max-width: 600px; margin: 50px auto; padding: 20px; background: white; border-radius: 15px; text-align: center; font-family: sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            <h1 style="color: #003366;">🏆 Painel Beach Master</h1>
            <p style="color: #666;">Bem-vindo, <strong>${email}</strong></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <div style="display: grid; gap: 10px;">
              <button style="padding: 15px; background: #f39c12; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Gerenciar Torneios</button>
              <button style="padding: 15px; background: #003366; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Ver Inscrições</button>
              <button onclick="location.reload()" style="padding: 10px; background: #ccc; border: none; border-radius: 8px; cursor: pointer; margin-top: 20px;">Sair do Sistema</button>
            </div>
          </div>
        `;
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
  if (!list) return;

  fetch(API_URL + "/events")
    .then(res => res.json())
    .then(events => {
      list.innerHTML = "";
      if (!events || events.length === 0) {
        list.innerHTML = "<li>Nenhum evento encontrado</li>";
        return;
      }

      events.forEach(e => {
        const li = document.createElement("li");
        li.style.padding = "8px";
        li.style.borderBottom = "1px solid #eee";
        li.textContent = "🎾 " + (e.nome || "Evento Sem Nome");
        list.appendChild(li);
      });
    })
    .catch(() => {
      if (list) list.innerHTML = "<li>Erro ao carregar lista de eventos</li>";
    });
}
