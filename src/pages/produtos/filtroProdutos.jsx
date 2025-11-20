import lupa from "../../assets/lupa.png";
import "./pageProdutos.css";

export default function FiltroProdutos(){
    return(
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
    )
}