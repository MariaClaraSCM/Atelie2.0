import HeaderGuest from "../header/headerguest";
import Footer from "../footer/footer";
import "./pageProdutos.css";
import lupa from "../../assets/lupa.png";
import grid from "../../assets/produtos/grid.png";
import list from "../../assets/produtos/list.png";

export default function PageProdutos() {
  return (
    <>
      <HeaderGuest />

      <div className="flex">
        <aside className="asideProdutos">
          <form action="" method="POST" className="ajusteAside">
            <h5>Filtrar produtos</h5>

            <div className="ajustePesquisar">
              <img src={lupa} alt="Buscar" />
              <input type="search" placeholder="Pesquisar..." />
            </div>

            <h5>CATEGORIAS</h5>
            <label>
              <input type="checkbox" name="categoria" />
              Categoria exemplo
            </label>

            <h5>Faixa de preço</h5>

            <div className="ajusteMinMax">
              <input type="number" placeholder="MIN" className="inputPreco" />
              <p>-</p>
              <input type="number" placeholder="MAX" className="inputPreco" />
            </div>

            <div className="radios">
              <label>
                <input type="radio" name="preco" value="25-" />
                Abaixo de R$25
              </label>

              <label>
                <input type="radio" name="preco" value="25-50" />
                R$25 - R$50
              </label>

              <label>
                <input type="radio" name="preco" value="50-100" />
                R$50 - R$100
              </label>

              <label>
                <input type="radio" name="preco" value="100-200" />
                R$100 - R$200
              </label>

              <label>
                <input type="radio" name="preco" value="200+" />
                Acima de R$200
              </label>
            </div>

            <div className="ajusteAplicar">
              <input type="submit" value="Aplicar filtros" />
            </div>
          </form>
        </aside>

        <section className="mainProdutos">
          <div className="ajusteHeaderMain">
            <div className="titulo">
              <h2>Coleção de produtos</h2>
              <p>mostrando 1-12 de **** resultadois</p>
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
        </section>
      </div>

      <Footer />
    </>
  );
}
