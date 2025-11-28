import { useEffect, useState } from "react";
import {
  listarCategorias,
  editarCategoria,
  excluirCategoria,
} from "../../services/api";
import "./dashboard.css";

export default function CategoriasList() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function carregar() {
    setCarregando(true);

    try {
      const resp = await listarCategorias();

      console.log("RETORNO DA API:", resp);

      if (resp.ok && Array.isArray(resp.data.categorias)) {
        // API no formato { ok: true, data: { categorias: [...] } }
        setCategorias(resp.data.categorias);
      } else if (resp.ok && Array.isArray(resp.data)) {
        // Caso a API retorne diretamente um array
        setCategorias(resp.data);
      } else {
        console.error("Resposta inesperada:", resp);
        setCategorias([]);
        alert("Erro: formato inesperado no retorno da API");
      }
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
      alert("Erro ao carregar categorias");
    }

    setCarregando(false);
  }

  useEffect(() => {
    carregar();
  }, []);

  const handleExcluir = async (id) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

    const resp = await excluirCategoria(id);

    if (resp.ok) {
      alert(resp.data.mensagem || "Categoria excluída.");
      setCategorias((c) => c.filter((x) => x.id_categoria !== id));
    } else {
      alert(resp.data.erro || "Erro ao excluir");
    }
  };

  const handleEditar = async (cat) => {
    const novo = prompt("Novo nome da categoria:", cat.nm_categoria);

    if (!novo || novo.trim() === "") return;

    const resp = await editarCategoria(cat.id_categoria, novo.trim());

    if (resp.ok) {
      alert(resp.data.mensagem || "Categoria atualizada.");
      setCategorias((c) =>
        c.map((x) =>
          x.id_categoria === cat.id_categoria
            ? { ...x, nm_categoria: novo.trim() }
            : x
        )
      );
    } else {
      alert(resp.data.erro || "Erro ao atualizar");
    }
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <div>
      <h3 className="h3ListCategoria">Lista de Categorias</h3>

      {categorias.length === 0 ? (
        <p>Nenhuma categoria cadastrada.</p>
      ) : (
        <table className="tabela">
          <thead>
            <tr>
              <th className="ttlth">Categoria</th>
              <th className="ttlth">Ações</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id_categoria} className="blocoCategoria">
                <td className="tuplaDoMeio">{cat.nm_categoria}</td>
                <td className="acoes">
                  <button onClick={() => handleEditar(cat)} className="editar">
                    Editar
                  </button>

                  <button
                    onClick={() => handleExcluir(cat.id_categoria)} className="excluir">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
