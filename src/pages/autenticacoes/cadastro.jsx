import seta from "../../assets/autenticacao/voltar.svg";
import "./cadastro.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cadastrarUsuario } from "../../services/api.js"; // <-- IMPORTANTE

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nm_usuario: "",
    cpf: "",
    dt_nascimento: "",
    telefone: "",
    email: "",
    senha: "",
    confirma_senha: "",
    foto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirma_senha) {
      alert("As senhas não coincidem!");
      return;
    }

    // Chama API externa
    const result = await cadastrarUsuario(formData);

    if (result.ok && result.data.sucesso) {
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } else {
      alert("Erro no cadastro: " + (result.data.erro || "Tente novamente."));
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
    <section className="cadastro-section">
      <div className="ajusteVoltar">
        <button onClick={voltar}>
          <img src={seta} alt="" />
          Voltar
        </button>
      </div>

      <div className="fundoFormCadastro">
        <form onSubmit={handleSubmit} className="form-login">
          <div >
            <h3>Criar conta</h3>
            <div className="ajus">
              <div>
                <label>Nome Completo:</label>
                <input
                  type="text"
                  name="nm_usuario"
                  value={formData.nm_usuario}
                  onChange={handleChange}
                  required
                />

                <label>CPF:</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  maxLength="11"
                  required
                />

                <label>Data de Nascimento:</label>
                <input
                  type="date"
                  name="dt_nascimento"
                  value={formData.dt_nascimento}
                  onChange={handleChange}
                  required
                />

                <label>Telefone:</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <label>Senha:</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />

                <label>Confirme sua senha:</label>
                <input
                  type="password"
                  name="confirma_senha"
                  value={formData.confirma_senha}
                  onChange={handleChange}
                  required
                />

                <label>Foto de perfil:</label>
                <input
                  type="file"
                  disabled
                  title="Upload desabilitado no momento."
                />
              </div>
            </div>
          </div>

          <div className="ajustebotao">
            <input type="submit" value="Cadastrar" className="botao-submit" />
          </div>

          <p className="cadastroLogin"><Link to="/login">Entrar na minha conta</Link></p>
        </form>
      </div>

      <div className="ajusteFinal">
        <hr />
        <p>© 2025 Ateliê Vó Egina. All rights reserved.</p>
      </div>
    </section>
  );
}