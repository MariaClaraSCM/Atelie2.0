import "./login.css";
import { Link, useNavigate } from "react-router-dom"; // Importe o useNavigate
import { useState } from "react"; // Importe o useState

export default function Login() {
    const navigate = useNavigate(); // Hook para redirecionamento
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const API_URL = "http://localhost/api/login.php"; // Nossa API de Login
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.sucesso) {
                alert("Login realizado com sucesso!");
                
                
                localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
                
               
                if (data.usuario.tipo === 'admin') {
                   
                    navigate('/dashboard'); 
                } else { 
                    navigate('/perfil'); 
                }
                
            } else { 
                alert("Erro no Login: " + (data.erro || "Verifique seu e-mail e senha."));
            }
            
        } catch (error) {
            console.error("Falha na conexão com a API:", error);
            alert("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
        }
    };


  return (
    <section className="login-section">
      <h1 className="texto-login">Seja bem-vindo!</h1>

    <form onSubmit={handleSubmit}>

        <div className="form-bloco-login">
          <h2>Informações pessoais</h2>

          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} value={formData.email} required />

          <label>Senha:</label>
          <input type="password" name="senha" onChange={handleChange} value={formData.senha} required />

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