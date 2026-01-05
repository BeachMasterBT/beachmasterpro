// Substitua a parte do redirecionamento visual por esta versão com funções reais:
document.body.innerHTML = `
  <div style="max-width: 600px; margin: 50px auto; padding: 20px; background: white; border-radius: 15px; text-align: center; font-family: sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
    <h1 style="color: #003366;">🏆 Painel Beach Master</h1>
    <p style="color: #666;">Bem-vindo, <strong>${email}</strong></p>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    <div style="display: grid; gap: 10px;">
      <button onclick="telaCadastrarTorneio()" style="padding: 15px; background: #f39c12; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Gerenciar Torneios</button>
      <button onclick="alert('Funcionalidade de Inscrições em breve!')" style="padding: 15px; background: #003366; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Ver Inscrições</button>
      <button onclick="location.reload()" style="padding: 10px; background: #ccc; border: none; border-radius: 8px; cursor: pointer; margin-top: 20px;">Sair do Sistema</button>
    </div>
    <div id="sub-painel" style="margin-top: 30px; text-align: left;"></div>
  </div>
`;

// Função para abrir o formulário de cadastro
window.telaCadastrarTorneio = function() {
  document.getElementById('sub-painel').innerHTML = `
    <div style="padding: 15px; border: 1px dashed #f39c12; border-radius: 8px;">
      <h3>Cadastrar Novo Torneio</h3>
      <input type="text" id="nomeTorneio" placeholder="Nome do Torneio" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px;">
      <button onclick="salvarTorneio()" style="width: 100%; padding: 10px; background: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Salvar no Banco de Dados</button>
    </div>
  `;
}
