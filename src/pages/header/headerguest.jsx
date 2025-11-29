import logoHeader from "../../assets/headers/logo.svg";
import lupa from "../../assets/lupa.png";
import perfil from "../../assets/headers/perfil.svg";
import "./headers.css";
import { Link } from "react-router-dom";

export default function HeaderGuest() {
  return (
    <header>
      <nav>
        <picture>
          <img src={logoHeader} alt="Atelie Vó Egina" />
        </picture>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/#sobre">Sobre</Link>
          </li>
          <li>
            <Link to="/verprodutos">Produtos</Link>
          </li>
          <li>
            <Link to="/#contato">Contato</Link>
          </li>
        </ul>
      </nav>

      <div className="ajusteNav">
        <div className="procurar">
          <input type="search" name="" id="" placeholder="Pesquisar" />
          <img src={lupa} alt="pesquisar" />
        </div>
        <ul>
          <li>
            <Link to="/login">Entrar</Link>
          </li>
          <li>
            <Link to="/cadastro">Cadastro</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
