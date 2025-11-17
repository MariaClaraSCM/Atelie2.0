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

        <div className="form-bloco">
          <h2>Endereço</h2>

          <label>CEP:</label>
          <input type="text" />

          <label>Rua:</label>
          <input type="text" />

          <label>Número:</label>
          <input type="text" />

          <label>Bairro:</label>
          <input type="text" />

          <label>Cidade:</label>
          <input type="text" />

          <label>Estado:</label>
          <input type="text" />
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
