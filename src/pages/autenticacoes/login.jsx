import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="login-section">
      <h1 className="texto-login">Seja bem-vindo!</h1>

    <form action="" method="post">

        <div className="form-bloco-login">
          <h2>Informações pessoais</h2>

          <label>Email:</label>
          <input type="email" />

          <label>Senha:</label>
          <input type="password" />

        </div>

      <div className="ajustebotao">
        <input type="submit" value="Entrar" className="botao-submit" />
      </div>
      </form>

      <p className="texto-login">
        Não tem conta? Faça seu cadastro <Link to="/cadastro" className="link">clicando aqui</Link>
      </p>
    </section>
  );
}
