import "./cadastro.css";
import { Link, useNavigate } from "react-router-dom"; // Importe o useNavigate
import { useState } from "react"; // Importe o useState

export default function Cadastro() { // Renomeado para Cadastro
    const navigate = useNavigate(); // Hook para redirecionamento
    const [formData, setFormData] = useState({
        nm_usuario: '',
        cpf: '',
        dt_nascimento: '',
        telefone: '',
        email: '',
        senha: '',
        confirma_senha: '', // Campo extra para validação no cliente
        // Endereço
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        logradouro: '',
        // Foto
        foto: null // Manter nulo por enquanto para simplificar o POST JSON
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

        const API_URL = "http://localhost/api/cadastro-usuario.php";
        
        // Cria um objeto de dados para enviar, excluindo o campo de confirmação
        const dataToSend = { ...formData };
        delete dataToSend.confirma_senha;
        
        // Remove a foto por enquanto, já que a API espera um caminho e não o arquivo
        delete dataToSend.foto;
        dataToSend.foto = null;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();

            if (response.ok && data.sucesso) {
                alert("Cadastro realizado com sucesso! Faça login.");
                navigate('/login'); // Redireciona para a página de login
            } else {
                alert("Erro no Cadastro: " + (data.erro || "Verifique os dados e tente novamente."));
            }
        } catch (error) {
            console.error("Falha na conexão com a API:", error);
            alert("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
        }
    };


  return (
    <section className="cadastro-section">
      <h1 className="texto-login">Seja bem-vindo!</h1>

    <form onSubmit={handleSubmit}>
      <div className="form-login">
        {/* BLOCO DE INFORMAÇÕES PESSOAIS */}
        <div className="form-bloco">
          <h2>Informações pessoais</h2>

          <label>Nome Completo:</label>
          <input type="text" name="nm_usuario" onChange={handleChange} value={formData.nm_usuario} required />

          <label>CPF:</label>
          <input type="text" name="cpf" onChange={handleChange} value={formData.cpf} maxLength="11" required />

          <label>Data de Nascimento:</label>
          <input type="date" name="dt_nascimento" onChange={handleChange} value={formData.dt_nascimento} required />

          <label>Telefone:</label>
          <input type="tel" name="telefone" onChange={handleChange} value={formData.telefone} required />

          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} value={formData.email} required />

          <label>Senha:</label>
          <input type="password" name="senha" onChange={handleChange} value={formData.senha} required />

          <label>Confirme sua senha:</label>
          <input type="password" name="confirma_senha" onChange={handleChange} value={formData.confirma_senha} required />

          <label>Foto de perfil:</label>
          {/* Por enquanto, não vamos processar o upload real do arquivo. */}
          <input type="file" disabled title="Funcionalidade de upload de foto desabilitada nesta etapa."/>
        </div>

        {/* BLOCO DE ENDEREÇO */}
        <div className="form-bloco">
            <h2>Endereço</h2>
            
            <label>CEP:</label>
            <input type="text" name="cep" onChange={handleChange} value={formData.cep} maxLength="8" required />

            <label>Rua:</label>
            <input type="text" name="rua" onChange={handleChange} value={formData.rua} required />

            <label>Número:</label>
            <input type="text" name="numero" onChange={handleChange} value={formData.numero} required />
            
            <label>Bairro:</label>
            <input type="text" name="bairro" onChange={handleChange} value={formData.bairro} required />

            <label>Cidade:</label>
            <input type="text" name="cidade" onChange={handleChange} value={formData.cidade} required />

            <label>Estado (UF):</label>
            <input type="text" name="estado" onChange={handleChange} value={formData.estado} maxLength="2" required />

            <label>Logradouro (Opcional):</label>
            <input type="text" name="logradouro" onChange={handleChange} value={formData.logradouro} />
            
            <label>Complemento (Opcional):</label>
            <input type="text" name="complemento" onChange={handleChange} value={formData.complemento} />
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