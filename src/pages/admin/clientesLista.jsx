import { useEffect, useState } from "react";
import { carregarClientes, excluirCliente } from "../../services/api";
import "./dashboard.css";

export default function AdmClientes() {
  const [clientes, setClientes] = useState([]);

  // Função para carregar clientes e atualizar state
  async function buscarClientes() {
    const dados = await carregarClientes(); // função do api.js
    if (dados.ok) setClientes(dados.clientes); // ✅ Aqui sim
  }

  useEffect(() => {
    buscarClientes();
  }, []);

  // Função para excluir cliente
  async function handleExcluir(id) {
    const confirmar = window.confirm("Deseja realmente excluir este cliente?");
    if (!confirmar) return;

    try {
      const resultado = await excluirCliente(id); // sua função do api.js
      if (resultado.ok) {
        alert("Cliente excluído com sucesso!");
        buscarClientes(); // atualiza a lista
      } else {
        alert("Erro ao excluir cliente: " + resultado.erro);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir cliente.");
    }
  }

  return (
    <div className="clientes-admin">
      <h2>Clientes cadastrados</h2>

      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado</p>
      ) : (
        <div className="lista-clientes">
          {clientes.map((c) => (
            <div key={c.id_usuario} className="card-cliente">
              <div>
                <strong>{c.nm_usuario}</strong>
                <p>{c.email}</p>
                <p>{c.telefone}</p>
              </div>

              <button
                className="btn-excluir"
                onClick={() => handleExcluir(c.id_usuario)}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
