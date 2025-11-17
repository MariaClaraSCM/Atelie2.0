import { Link } from "react-router-dom";
import logoHeader from '../../assets/logo-header.png';
import lupa from '../../assets/lupa.png';
import './headers.css';

export default function HeaderGuest() {
    return(
        <header>
            <picture>
                <img src={logoHeader} alt="Atelie Vó Egina"  />
                <legend>Ateliê Vó Egina</legend>
            </picture>

            <nav>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Sobre</a></li>
                    <li><a href="">Produtos</a></li>
                    <li><a href="">Contato</a></li>
                </ul>
                <div className='procurar'>
                    <input type="search" name="" id="" placeholder='Pesquisar' />
                    <img src={lupa} alt="pesquisar" />
                </div>
                <ul>
                    <li><Link to="/login">Entrar</Link></li>
                    <li><Link to="/cadastro">Cadastro</Link></li>
                </ul>
            </nav>
        </header>
    )
}