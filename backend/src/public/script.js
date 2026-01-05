// URL REAL DO BACKEND (já funcionando no Render)
const API_URL = "https://beachmasterpro.onrender.com";

// STATUS DO BACKEND
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    document.getElementById("apiStatus").textContent =
      "Conectado ao backend com sucesso!\n\n" +
      JSON.stringify(data, null, 2);
  })
  .catch(() => {
    document.getElementById("apiStatus").textContent =
      "Erro ao conectar com o backend.";
  });

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        document.getElementById("loginMsg").style.color = "green";
        document.getElementById("loginMsg").textContent =
          "Login realizado com sucesso!";
        loadEvents();
      } else {
        document.getElementById("loginMsg").style.color = "red";
        document.getElementById("loginMsg").textContent =
          data.message || "Erro no login";
      }
    })
    .catch(() => {
      document.getElementById("loginMsg").style.color = "red";
      document.getElementById("loginMsg").textContent =
        "Erro de conexão com o servidor.";
    });
}

// EVENTOS
function loadEvents() {
  fetch(API_URL + "/events")
    .then(res => res.json())
    .then(events => {
      const list = document.getElementById("eventList");
      list.innerHTML = "";

      if (!events || events.length === 0) {
        list.innerHTML = "<li>Nenhum evento encontrado</li>";
        return;
      }

      events.forEach(e => {
        const li = document.createElement("li");
        li.textContent = e.name || "Evento sem nome";
        list.appendChild(li);
      });
    })
    .catch(() => {
      alert("Erro ao carregar eventos");
    });
}
