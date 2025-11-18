import logoHeader from '../../assets/logo-header.png';
import lupa from '../../assets/lupa.png';
import './headers.css';
import { Link }from 'react-router-dom';

export default function HeaderUser() {
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
                <div class='procurar'>
                    <input type="search" name="" id="" placeholder='Pesquisar' />
                    <img src={lupa} alt="pesquisar" />
                </div>
                <ul>
                    <li><Link to="/perfil">Perfil</Link></li>
                    <li><a href="">Sair</a></li>
                </ul>
            </nav>
        </header>
    )
}