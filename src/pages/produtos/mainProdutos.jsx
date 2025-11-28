import grid from "../../assets/produtos/grid.png";
import list from "../../assets/produtos/list.png";
import ListaProdutos from "./listarprodutos";
import "./pageProdutos.css";

export default function MainProdutos() {
  return (
    <section className="mainComprarProdutos">
      <div className="ajusteHeaderMain">
        <div className="titulo">
          <h2>Coleção de produtos</h2>
          <p>mostrando 1-12 de **** resultados</p>
        </div>

        <div className="classificar">
          <select name="classificacao">
            <option value="alfabetico">Ordem alfabética</option>
            <option value="recente">Mais recente</option>
            <option value="antigo">Mais antigo</option>
            <option value="barato">Mais barato</option>
            <option value="caro">Mais caro</option>
          </select>

          <div className="modoVizu">
            <button className="btnGrid">
              <img src={grid} />
            </button>
            <button className="btnList">
              <img src={list} />
            </button>
          </div>
        </div>
      </div>

      <main className="mainComprarProdutos">
        <ListaProdutos />
      </main>
    </section>
  );
}
