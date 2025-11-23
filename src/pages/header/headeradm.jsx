import logoHeader from "../../assets/headers/logo.svg";
import lupa from "../../assets/lupa.png";
import perfil from "../../assets/headers/perfil.svg";
import "./headers.css";
import { Link } from "react-router-dom";

export default function HeaderAdm() {
  return (
    <header className="backHeader">
      <div className="ajusteEsquerda">
        <picture>
          <img src={logoHeader} alt="Atelie Vó Egina" />
        </picture>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#why-choose-us">Sobre</a>
            </li>
            <li>
              <a href="#our-products">Produtos</a>
            </li>
            <li>
              <a href="#footer">Contato</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="ajusteDireita">
        <div className="procurar">
          <input type="search" name="" id="" placeholder="Pesquisar" />
          <img src={lupa} alt="pesquisar" />
        </div>
        <ul>
          <li className="cadastro">
            <Link to="/cadastro">
              <img src={perfil} alt="" />
              perfil
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
