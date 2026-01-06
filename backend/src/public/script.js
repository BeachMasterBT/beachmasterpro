// URL do seu backend no Render
const API_URL = "https://beachmasterpro.onrender.com";

// 1. FUNÇÃO PARA VERIFICAR STATUS AO CARREGAR A PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    verificarConexao();
    carregarEventos();
});

function verificarConexao() {
    const statusElement = document.getElementById("backend-status");
    fetch(`${API_URL}/health`)
        .then(res => res.json())
        .then(data => {
            if (data.status === "OK") {
                statusElement.textContent = "Conectado ✅";
                statusElement.style.color = "#27ae60";
            }
        })
        .catch(() => {
            statusElement.textContent = "Erro ❌";
            statusElement.style.color = "#c0392b";
        });
}

// 2. FUNÇÃO DE LOGIN (COM ATUALIZAÇÃO DE STATUS)
function fazerLogin(event) {
    if (event) event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token || data.message === "Login OK") {
            alert("Login realizado com sucesso!");
            
            // Força a luzinha a ficar verde após o login bem-sucedido
            const statusElement = document.getElementById("backend-status");
            if (statusElement) {
                statusElement.textContent = "Conectado ✅";
                statusElement.style.color = "#27ae60";
            }

            // Atualiza a lista de eventos imediatamente
            carregarEventos();
        } else {
            alert("Erro: " + (data.message || "Credenciais inválidas"));
        }
    })
    .catch(err => {
        console.error("Erro no login:", err);
        alert("Erro de conexão com o servidor.");
    });
}

// 3. FUNÇÃO PARA CRIAR EVENTO
async function criarEvento() {
    const nome = document.getElementById("nomeEvento").value;
    const data = document.getElementById("dataEvento").value;

    if (!nome || !data) {
        alert("Preencha o nome e a data do evento!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, data })
        });

        if (response.ok) {
            alert("Evento criado com sucesso!");
            document.getElementById("nomeEvento").value = "";
            document.getElementById("dataEvento").value = "";
            carregarEventos(); // Atualiza a lista
        } else {
            alert("Erro ao criar evento.");
        }
    } catch (error) {
        alert("Erro ao conectar com o servidor.");
    }
}

// 4. FUNÇÃO PARA CARREGAR LISTA DE EVENTOS
function carregarEventos() {
    const lista = document.getElementById("eventos-lista");
    if (!lista) return;

    fetch(`${API_URL}/events`)
        .then(res => res.json())
        .then(eventos => {
            lista.innerHTML = ""; // Limpa a lista atual
            if (eventos.length === 0) {
                lista.innerHTML = "<li>Nenhum evento cadastrado.</li>";
                return;
            }
            eventos.forEach(ev => {
                const li = document.createElement("li");
                li.textContent = `${ev.nome} - ${ev.data}`;
                lista.appendChild(li);
            });
        })
        .catch(err => console.error("Erro ao carregar eventos:", err));
}
