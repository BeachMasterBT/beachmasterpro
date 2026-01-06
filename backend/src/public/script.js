const API = "https://beachmasterpro.onrender.com";

/* START */
window.onload = () => {
  verificarStatus();
  carregarEventos();
};

/* STATUS */
function verificarStatus() {
  const el = document.getElementById("backend-status");

  fetch(`${API}/health`)
    .then(res => res.json())
    .then(() => {
      el.innerText = "Conectado ✅";
      el.style.color = "green";
    })
    .catch(() => {
      el.innerText = "Erro ❌";
      el.style.color = "red";
    });
}

/* LOGIN */
async function fazerLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
