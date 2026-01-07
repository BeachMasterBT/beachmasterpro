const API = "https://beachmasterpro.onrender.com";

const statusEl = document.getElementById("status");
const painel = document.getElementById("painel");
const loginDiv = document.getElementById("login");

window.onload = () => {
  fetch(API + "/health")
    .then(res => res.json())
    .then(() => {
      statusEl.innerText = "Conectado ✅";
      statusEl.style.color = "green";
    })
    .catch(() => {
      statusEl.innerText = "Erro ❌";
      statusEl.style.color = "red";
    });
};

function login() {
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
        loginDiv.style.display = "none";
        painel.style.display = "block";
        carregarEventos();
      } else {
        alert("Login inválido");
      }
    });
}

function criarEvento() {
  const nome = document.getElementById("nomeEvento").value;
  const data = document.getElementById("dataEvento").value;

  fetch(API + "/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, data })
  })
    .then(() => carregarEventos());
}

function carregarEventos() {
  fetch(API + "/events")
    .then(res => res.json())
    .then(eventos => {
      const lista = document.getElementById("listaEventos");
      lista.innerHTML = "";
      eventos.forEach(ev => {
        const div = document.createElement("div");
        div.className = "evento";
        div.innerText = `${ev.nome} - ${ev.data}`;
        lista.appendChild(div);
      });
    });
}
