const API_URL = "https://beachmasterpro.onrender.com";

window.onload = () => {
    verificarConexao();
    carregarEventos();
};

async function verificarConexao() {
    const statusDiv = document.getElementById("apiStatus");
    try {
        const res = await fetch(`${API_URL}/health`);
        const data = await res.json();
        if (data.status === "OK") {
            statusDiv.innerHTML = "Conectado ✅";
            statusDiv.style.color = "green";
        }
    } catch (err) {
        statusDiv.innerHTML = "Erro de Conexão ❌";
        statusDiv.style.color = "red";
    }
}

async function fazerLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (res.ok) {
        alert("Bem-vindo, Beach Master!");
        document.getElementById("login-container").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
    } else {
        alert("Acesso Negado: Verifique suas credenciais.");
    }
}

async function carregarEventos() {
    const lista = document.getElementById("eventList");
    const res = await fetch(`${API_URL}/events`);
    const eventos = await res.json();
    lista.innerHTML = eventos.map(ev => `<li>🏆 <strong>${ev.nome}</strong> - ${ev.data}</li>`).join("");
}

async function criarEvento() {
    const nome = document.getElementById("nomeEvento").value;
    const data = document.getElementById("dataEvento").value;
    
    await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, data })
    });

    alert("Torneio publicado!");
    carregarEventos();
}
