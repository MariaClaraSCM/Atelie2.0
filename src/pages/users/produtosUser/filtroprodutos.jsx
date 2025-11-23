import { useState } from "react";
import "./produtos.css";
import grid from "../../../assets/produtos/grid.svg";
import list from "../../../assets/produtos/list.svg";

export default function FiltroProduto({ onFiltroChange }) {

  // CATEGORIAS (você pode editar depois)
  const categorias = [
    "Todos",
    "Vestidos",
    "Saias",
    "Conjuntos",
    "Blusas",
    "Infantil"
  ];

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("Recentes");
  const [visualizacao, setVisualizacao] = useState("grid");

  // Selecionar categoria
  function selecionarCategoria(categoria) {
    setCategoriaSelecionada(categoria);

    if (onFiltroChange) {
      onFiltroChange({
        categoria: categoria,
        ordenacao: ordenacao,
        visualizacao: visualizacao
      });
    }
  }

  // Alterar ordenação
  function alterarOrdenacao(valor) {
    setOrdenacao(valor);

    if (onFiltroChange) {
      onFiltroChange({
        categoria: categoriaSelecionada,
        ordenacao: valor,
        visualizacao: visualizacao
      });
    }
  }

  // Mudar visualização
  function mudarVisualizacao(tipo) {
    setVisualizacao(tipo);

    if (onFiltroChange) {
      onFiltroChange({
        categoria: categoriaSelecionada,
        ordenacao: ordenacao,
        visualizacao: tipo
      });
    }
  }

  return (
    <div className="filtro">

      {/* BOTÕES DE CATEGORIA */}
      <div className="btncategorias">
        {categorias.map((cat, index) => (
          <button 
            key={index}
            onClick={() => selecionarCategoria(cat)}
            className={cat === categoriaSelecionada ? "ativo" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FILTROS SECUNDÁRIOS */}
      <div className="categorias">
        <div className="escolhas">

          {/* SELECT DE ORDENAÇÃO */}
          <select onChange={(e) => alterarOrdenacao(e.target.value)}>
            <option value="Recentes">Recentes</option>
            <option value="Antigos">Antigos</option>
            <option value="Mais baratos">Mais baratos</option>
            <option value="Mais caros">Mais caros</option>
          </select>

          {/* TOGGLE GRID / LIST */}
          <div className="toggle">
            <button 
              onClick={() => mudarVisualizacao("grid")}
              className={visualizacao === "grid" ? "ativo" : ""}
            >
              <img src={grid} alt="Modo de visualização em grade" />
            </button>

            <button 
              onClick={() => mudarVisualizacao("list")}
              className={visualizacao === "list" ? "ativo" : ""}
            >
              <img src={list} alt="Modo de visualização em lista" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
