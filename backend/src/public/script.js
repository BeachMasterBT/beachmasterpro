const API_URL = "https://beachmasterpro.onrender.com";

async function fazerLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Tentando login..."); // Isso aparecerá no seu console

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok || data.message === "Login OK") {
            alert("Bem-vindo, Beach Master!");
            
            // ESTE É O COMANDO QUE ABRE O SISTEMA:
            document.getElementById("login-container").style.display = "none";
            document.getElementById("admin-panel").style.display = "block";
            
            carregarEventos();
        } else {
            alert("E-mail ou senha incorretos.");
        }
    } catch (err) {
        console.error("Erro ao conectar:", err);
        alert("Erro de conexão com o servidor.");
    }
}

// Garante que a função carregarEventos exista para não dar erro
async function carregarEventos() {
    const lista = document.getElementById("eventList");
    try {
        const res = await fetch(`${API_URL}/events`);
        const eventos = await res.json();
        lista.innerHTML = eventos.map(ev => `<li>🏆 <strong>${ev.nome}</strong> - ${ev.data}</li>`).join("");
    } catch (e) {
        console.log("Nenhum evento encontrado ainda.");
    }
}

// Verifica conexão ao abrir a página
window.onload = () => {
    fetch(`${API_URL}/health`)
        .then(res => res.json())
        .then(data => {
            const statusDiv = document.getElementById("apiStatus");
            if(data.status === "OK") {
                statusDiv.innerHTML = "Conectado ✅";
                statusDiv.style.color = "green";
            }
        });
};
