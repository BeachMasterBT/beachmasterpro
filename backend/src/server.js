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
        
        // --- O COMANDO QUE ESTAVA FALTANDO ---
        // Aqui você escolhe para onde o usuário vai após o login
        // Por enquanto, vamos simular a entrada escondendo o login e mostrando o conteúdo
        document.querySelector('.container').innerHTML = `
          <h1>Bem-vindo ao Painel Beach Master</h1>
          <p>Você está logado como: ${email}</p>
          <button onclick="location.reload()">Sair do Sistema</button>
        `;
      } else {
        alert("Erro: " + (data.message || "Credenciais inválidas"));
      }
    })
    .catch(() => {
      alert("Erro de conexão com o servidor.");
    });
}
