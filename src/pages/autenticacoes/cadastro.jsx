import "./cadastro.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="cadastro-section">
      <h1 className="texto-login">Seja bem-vindo!</h1>

    <form action="" method="post">
      <div className="form-login">
        <div className="form-bloco">
          <h2>Informações pessoais</h2>

          <label>Nome:</label>
          <input type="text" />

          <label>Email:</label>
          <input type="email" />

          <label>Senha:</label>
          <input type="password" />

          <label>Confirme sua senha:</label>
          <input type="password" />

          <label>Foto de perfil:</label>
          <input type="file" />
        </div>

      </div>
      <div className="ajustebotao">
        <input type="submit" value="Cadastrar" className="botao-submit" />
      </div>
      </form>

      <p className="texto-login">
        Já tem conta? Faça seu login <Link to="/login" className="link">clicando aqui</Link>
      </p>
    </section>
  );
}
