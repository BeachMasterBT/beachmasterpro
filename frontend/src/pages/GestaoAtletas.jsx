import React from "react";

export default function GestaoAtletas() {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Atleta</th>
            <th>Categoria</th>
            <th>Pontos</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lucas Silva</td>
            <td>Pro</td>
            <td>9.320</td>
            <td style={{ color: "#10b981" }}>Ativo</td>
            <td>
              <button className="button green">Gerenciar</button>
            </td>
          </tr>
          <tr>
            <td>Ana Pereira</td>
            <td>Amador</td>
            <td>7.180</td>
            <td style={{ color: "#f97316" }}>Pendente</td>
            <td>
              <button className="button green">Gerenciar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}