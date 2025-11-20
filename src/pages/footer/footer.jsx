import tesoura from "../../assets/tesoura.png";
import telefone from "../../assets/telefone.png";
import email from "../../assets/email.png";
import endereco from "../../assets/endereco.png";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="conteudo-footer">
        <div className="ajustefooter">
          <ul>
            <h3>
              <img src={tesoura} alt="" />
              Ateliê Vó Egina
            </h3>
            <li>Aqui criamos tudo com amor. Volte sempre!</li>
          </ul>

          <ul>
            <h3>Sobre o ateliê</h3>
            <li>
              <a href="">Serviços</a>
            </li>
            <li>
              <a href="">produtos</a>
            </li>
            <li>
              <a href="">Costumização</a>
            </li>
            <li>
              <a href="">Perguntas frequentes</a>
            </li>
          </ul>

          <ul>
            <h3>Contato</h3>
            <li>
              <img src={telefone} alt="telefone" />
              <a href="">(13) 97403-5658</a>
            </li>
            <li>
              <img src={email} alt="email" />
              <a href="">reginapinto31@gmail.com</a>
            </li>
            <li>
              <img src={endereco} alt="endereço" />
              <a href="">
                R. Perpétua de Oliveira Freitas, 1260 - casa 1 - Rio Branco, São
                Vicente - SP, 11347-060
              </a>
            </li>
          </ul>

          <ul>
            <h3>Redes Sociais</h3>
          </ul>
        </div>
      </div>

      <hr />

      <p>© 2025 Ateliê Vó Egina. All rights reserved.</p>
    </footer>
  );
}
