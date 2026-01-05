const API_URL = "https://beachmasterpro.onrender.com";

// Função para Salvar um Torneio no Banco de Dados Real
async function salvarTorneio() {
    const nome = document.getElementById('nomeTorneio').value;
    if (!nome) return alert("Digite o nome do torneio!");

    try {
        const response = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: nome })
        });

        if (response.ok) {
            alert("✅ Torneio salvo com sucesso no MongoDB!");
            location.reload(); // Recarrega para mostrar na lista
        } else {
            alert("❌ Erro ao salvar o torneio.");
        }
    } catch (error) {
        alert("Erro de conexão com o servidor.");
    }
}

// Função que desenha a tela de gerenciamento quando você clica no botão
window.telaCadastrarTorneio = function() {
    const painel = document.getElementById('sub-painel');
    if (painel) {
        painel.innerHTML = `
            <div style="background: #fdf2e2; padding: 20px; border: 2px solid #f39c12; border-radius: 10px; margin-top: 20px;">
                <h3 style="color: #d35400; margin-top: 0;">Novo Torneio</h3>
                <input type="text" id="nomeTorneio" placeholder="Ex: Open de Beach Tennis" style="width: 100%; padding: 12px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;">
                <button onclick="salvarTorneio()" style="width: 100%; padding: 12px; background: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">CADASTRAR NO SISTEMA</button>
            </div>
        `;
    }
};
