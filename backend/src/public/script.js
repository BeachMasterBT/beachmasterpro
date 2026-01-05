const API = "https://beachmasterpro.onrender.com";

fetch(API)
  .then(r => r.json())
  .then(() => document.getElementById("status").innerText = "Conectado ✅")
  .catch(() => document.getElementById("status").innerText = "Erro ❌");

function login(e) {
  e.preventDefault();
  fetch(API + "/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email.value,
      senha: senha.value
    })
  })
  .then(r => r.json())
  .then(d => alert("Login OK"));
}

function salvarTorneio() {
  fetch(API + "/events", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      nome: nomeEvento.value,
      data: dataEvento.value
    })
  })
  .then(() => carregarEventos());
}

function carregarEventos() {
  fetch(API + "/events")
    .then(r => r.json())
    .then(events => {
      listaEventos.innerHTML = "";
      events.forEach(e => {
        const li = document.createElement("li");
        li.innerText = e.nome + " - " + e.data;
        listaEventos.appendChild(li);
      });
    });
}

carregarEventos();
