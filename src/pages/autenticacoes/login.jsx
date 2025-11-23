import seta from "../../assets/autenticacao/voltar.svg";
import "./login.css";
import { Link, useNavigate } from "react-router-dom"; // Importe o useNavigate
import { useState } from "react"; // Importe o useState

export default function Login() {
  const navigate = useNavigate(); // Hook para redirecionamento
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = "http://localhost/api/login.php"; // Nossa API de Login

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.sucesso) {
        alert("Login realizado com sucesso!");

        localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));

        if (data.usuario.tipo === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/perfil");
        }
      } else {
        alert(
          "Erro no Login: " + (data.erro || "Verifique seu e-mail e senha.")
        );
      }
    } catch (error) {
      console.error("Falha na conexão com a API:", error);
      alert(
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
  };

  const navigateV = useNavigate();

  const voltar = () => {
    if (window.history.length > 1) {
      navigateV(-1); // volta se houver histórico
    } else {
      navigateV("/"); // se não, vai para uma rota padrão
    }
  };

  return (
    <section className="login-section">
      <div className="ajusteVoltar">
        <button onClick={voltar}><img src={seta} alt="" />Voltar</button>
      </div>

      <div className="fundoFormLogin">
        <form onSubmit={handleSubmit} className="formLogin">
          <div className="form-bloco-login">
            <h3>Entre na sua conta</h3>

            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />

            <div className="senha">
              <label>Senha:</label>
              <input
                type="password"
                name="senha"
                onChange={handleChange}
                value={formData.senha}
                required
              />
            </div>
            <p className="links">Esqueci minha senha</p>
          </div>

          <div className="ajustebotao">
            <input type="submit" value="Entrar" className="botao-submit" />
          </div>
          <div className="ajusteBotoesEntrar">
            <button className="google">Entrar com o Google</button>
            <button className="face">Entrar com o Facebook</button>
          </div>
          <p className="links cadastroLogin">
            <Link to="/cadastro">Criar nova conta</Link>
          </p>
        </form>
      </div>

      <div className="ajusteFinal">
        <hr />
        <p>© 2025 Ateliê Vó Egina. All rights reserved.</p>
      </div>
    </section>
  );
}