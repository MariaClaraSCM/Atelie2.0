import "./cadastro.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cadastrarUsuario } from "../../services/api.js"; // <-- IMPORTANTE

export default function Cadastro() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nm_usuario: '',
    cpf: '',
    dt_nascimento: '',
    telefone: '',
    email: '',
    senha: '',
    confirma_senha: '',
    foto: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  return (
    <section className="cadastro-section">
      <h1 className="texto-login">Seja bem-vindo!</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-login">
          
          <div className="form-bloco">
            <h2>Informações pessoais</h2>

            <label>Nome Completo:</label>
            <input type="text" name="nm_usuario" value={formData.nm_usuario} onChange={handleChange} required />

            <label>CPF:</label>
            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} maxLength="11" required />

            <label>Data de Nascimento:</label>
            <input type="date" name="dt_nascimento" value={formData.dt_nascimento} onChange={handleChange} required />

            <label>Telefone:</label>
            <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Senha:</label>
            <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />

            <label>Confirme sua senha:</label>
            <input type="password" name="confirma_senha" value={formData.confirma_senha} onChange={handleChange} required />

            <label>Foto de perfil:</label>
            <input type="file" disabled title="Upload desabilitado no momento." />

          </div>

        </div>

        <div className="ajustebotao">
          <input type="submit" value="Cadastrar" className="botao-submit" />
        </div>

      </form>

      <p className="texto-login">
        Já tem conta? <Link to="/login" className="link">Faça login aqui</Link>
      </p>
    </section>
  );
}
