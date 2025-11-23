import { useState, useEffect } from "react"; 
import HeaderUser from "../header/headeruser.jsx";
import Footer from "../footer/footer.jsx";
import perfil from "../../assets/perfil.jfif";
import "./userpage.css";

const API_ENDERECO = "http://localhost/api/endereco.php";
const API_USUARIO = "http://localhost/api/usuarios.php"; // API para buscar/editar o perfil

export default function UserPage() {
 

  // --- 1. ESTADO PRINCIPAL DO USUÁRIO ---
  const [formData, setFormData] = useState({
    id_usuario: "", 
    nm_usuario: "",
    email: "",
    telefone: "",
    // Dados de Endereço (Serão preenchidos ao carregar)
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [cepErro, setCepErro] = useState("");
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado && usuarioLogado.id_usuario) {
      // 1. Preenche o estado com dados básicos do localStorage
      setFormData({
        ...formData,
        id_usuario: usuarioLogado.id_usuario,
        nm_usuario: usuarioLogado.nm_usuario,
        email: usuarioLogado.email,
        telefone: usuarioLogado.telefone || '',
      });
      
      
      fetchDadosCompletos(usuarioLogado.id_usuario);
    } else {
      
      console.error("Usuário não logado ou ID ausente.");
      navigate('/login'); 
      setLoading(false);
    }
  }, []);

  const fetchDadosCompletos = async (id) => {
    try {
        
        const response = await fetch(`${API_USUARIO}?id_usuario=${id}`);
        const data = await response.json();
        
        if (response.ok && data.sucesso) {
            const usuarioCompleto = data.usuario;
            setFormData(prev => ({
                ...prev,
                nm_usuario: usuarioCompleto.nm_usuario,
                email: usuarioCompleto.email,
                telefone: usuarioCompleto.telefone,
                // Assumindo que a API retorna os campos de endereço
                cep: usuarioCompleto.cep || '',
                rua: usuarioCompleto.rua || '',
                numero: usuarioCompleto.numero || '',
                bairro: usuarioCompleto.bairro || '',
                cidade: usuarioCompleto.cidade || '',
                estado: usuarioCompleto.estado || '',
            }));
        } else {
            console.error("Erro ao buscar dados completos:", data.erro);
        }
    } catch (error) {
        console.error("Falha na API de busca de usuário:", error);
    } finally {
        setLoading(false);
    }
  };


 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  function handleCEPChange(e) {
    const value = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, cep: value })); // Atualiza o CEP no formData
    setCepErro("");

    if (value.length === 8) {
      fetch(`https://www.cepaberto.com/api/v3/cep?cep=${value}`, {
        headers: {
          Authorization: `Token token=${import.meta.env.VITE_CEPABERTO_TOKEN}`,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          if (!data || data.erro || !data.logradouro) {
            setCepErro("CEP não encontrado!");
            setFormData(prev => ({ ...prev, rua: "", bairro: "", cidade: "", estado: "" }));
            return;
          }

          setFormData((prev) => ({
            ...prev,
            rua: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.cidade?.nome || "",
            estado: data.estado?.sigla || "",
          }));
        })
        .catch((err) => {
          console.error("Erro CEP:", err);
          setCepErro("Erro ao buscar CEP!");
        });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    

    try {
        
        const response = await fetch(API_USUARIO, { 
            method: 'PUT', // Usando PUT para atualização
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();

        if (response.ok && data.sucesso) {
            alert("Informações atualizadas com sucesso! 🎉");
          
            const usuarioAtualizado = JSON.parse(localStorage.getItem('usuarioLogado'));
            usuarioAtualizado.nm_usuario = formData.nm_usuario;
            usuarioAtualizado.email = formData.email;
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

        } else {
            alert("Erro ao salvar: " + (data.erro || "Verifique os dados e tente novamente."));
        }

    } catch (error) {
        console.error("Falha na conexão com a API de edição:", error);//TRATAMENTO DE ERRO
        alert("Não foi possível conectar ao servidor para salvar a edição.");
    }
  };

  // Controle das seções
  const [selectedSection, setSelectedSection] = useState("conta");
  const [selectedSubSection, setSelectedSubSection] = useState("ativas");
  
  
  if (loading) {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <HeaderUser />
            <p>Carregando informações do perfil...</p>
            <Footer />
        </div>
    );
  }

 
  return (
    <div className="userpage-container">
      <HeaderUser />

      <div className="ajustepage">
        {/* MENU LATERAL */}
        <aside>
          <div className="juntos">
            <picture className="fotoPerfil">
              <img src={perfil} alt="" />
              <legend>Olá, *nome usuario*</legend>
            </picture>
          <picture className="fotoPerfil">
            <img src={perfil} alt="" />
            
            <legend>Olá, {formData.nm_usuario || "Usuário"}</legend> 
          </picture>

            <button
              onClick={() => setSelectedSection("conta")}
              className={`Infos ${selectedSection === "conta" ? "active" : ""}`}
            >
              Minha Conta
            </button>

            <button
              onClick={() => {
                setSelectedSection("compras");
                setSelectedSubSection("ativas");
              }}
              className={`Infos ${
                selectedSection === "compras" ? "active" : ""
              }`}
            >
              Minhas Compras
            </button>

            <button
              onClick={() => setSelectedSection("historico")}
              className={`Infos ${
                selectedSection === "historico" ? "active" : ""
              }`}
            >
              Histórico
            </button>
          </div>

          <button>Sair</button>
          <button
            onClick={() => setSelectedSection("historico")}
            className={`Infos ${
              selectedSection === "historico" ? "active" : ""
            }`}
          >
            Meus Favoritos
          </button>
        </aside>

        <hr />

        {/* ÁREA PRINCIPAL */}
        <main>
          {/* SEÇÃO MINHA CONTA */}
          {selectedSection === "conta" && (
            <div className="Forms">
              <h2>Minhas Informações</h2>
              <hr />

              {/* NOVIDADE: Adicionado onSubmit e removido action/method */}
              <form className="formEditar" onSubmit={handleSubmit}> 
                <div className="ajusteBlocoForm">
                  {/* BLOCO ESQUERDO */}
                  <div className="form-bloco">
                    
                    
                    <label>Nome:</label>
                    <input type="text" name="nm_usuario" value={formData.nm_usuario} onChange={handleChange} />

                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />

                    <label>Telefone:</label>
                    <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} />

                    <label>Senha:</label>
                    <input type="password" name="senha" placeholder="Preencha apenas para mudar" onChange={handleChange} />

                    <label>Confirme sua senha:</label>
                    <input type="password" name="confirma_senha" placeholder="Preencha apenas para mudar" onChange={handleChange} />

                    <label>Foto de perfil:</label>
                    <input type="file" disabled title="Funcionalidade desabilitada nesta versão" />
                  </div>

                  {/* BLOCO DIREITO */}
                  <div className="form-bloco">
                    <h2>Adicionar Endereço</h2>

                    <label>CEP:</label>
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={handleCEPChange}
                      maxLength={8}
                    />
                    {cepErro && <p className="erroCEP">{cepErro}</p>}

                    <label>Rua:</label>
                    <input
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={handleChange}
                      disabled={!!formData.rua} // Desabilita se o CEP preencheu
                    />

                    <label>Número:</label>
                    <input type="text" name="numero" value={formData.numero} onChange={handleChange} />

                    <label>Bairro:</label>
                    <input
                      type="text"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      disabled={!!formData.bairro} // Desabilita se o CEP preencheu
                    />

                    <label>Cidade:</label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      disabled={!!formData.cidade} // Desabilita se o CEP preencheu
                    />

                    <label>Estado:</label>
                    <input
                      type="text"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      disabled={!!formData.estado} // Desabilita se o CEP preencheu
                    />
                  </div>
                </div>

                <div className="ajusteBtnEditar">
                  <input type="submit" value="Salvar edição" />
                </div>
              </form>
            </div>
          )}

          {/* SEÇÃO MINHAS COMPRAS */}
          {selectedSection === "compras" && (
            <div className="compras">
              <h2>Compras Ativas</h2>
              <h2>Minhas Compras</h2>
              <hr />

              {/* NOVIDADE: Menu de subseções */}
              <div className="sub-menu-compras">
                <button
                    type="button"
                    onClick={() => setSelectedSubSection("ativas")}
                    className={`btnCompras ${selectedSubSection === "ativas" ? "ativo" : ""}`.trim()}
                >
                    Compras Ativas
                </button>
                <button
                    type="button"
                    onClick={() => setSelectedSubSection("historico")}
                    className={`btnCompras ${selectedSubSection === "historico" ? "ativo" : ""}`.trim()}
                >
                    Histórico
                </button>
              </div>
              <hr />

              {/* CONTEÚDO DAS SUBSEÇÕES */}
              {selectedSubSection === "ativas" && (
                <div>
                  <h3>Pedidos em Andamento</h3>
                  <p>Aqui você listará os pedidos com status 'Pendente', 'Em andamento' ou 'A caminho'.</p>
                </div>
              )}

              {selectedSubSection === "historico" && (
                <div>
                  <h3>Histórico de Compras (Entregues/Cancelados)</h3>
                  <p>Aqui você listará os pedidos com status 'Entregue' ou 'Cancelado'.</p>
                </div>
              )}
            </div>
          )}

          {/* SEÇÃO FAVORITOS (Antigo Histórico) */}
          {selectedSection === "historico" && (
            <div className="favoritos">
              <h2>Meus Favoritos ❤️</h2>
              <hr />
              <p>Aqui você listará todos os produtos que o usuário favoritou na tela inicial ou de produtos.</p>
              {/* Você usará o `id_usuario` para buscar os produtos na tabela `favoritos` */}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}



















// import { useState } from "react";
// import HeaderUser from "../header/headeruser.jsx";
// import Footer from "../footer/footer.jsx";
// import perfil from "../../assets/perfil.jfif";
// import "./userpage.css";

// export default function UserPage() {
//   // Estados do CEP
//   const [cep, setCep] = useState("");
//   const [rua, setRua] = useState("");
//   const [bairro, setBairro] = useState("");
//   const [cidade, setCidade] = useState("");
//   const [estado, setEstado] = useState("");
//   const [cepErro, setCepErro] = useState("");

//   function handleCEPChange(e) {
//     const value = e.target.value.replace(/\D/g, "");
//     setCep(value);

//     // limpa mensagens anteriores
//     setCepErro("");

//     if (value.length === 8) {
//       fetch(`https://www.cepaberto.com/api/v3/cep?cep=${value}`, {
//         headers: {
//           Authorization: `Token token=${import.meta.env.VITE_CEPABERTO_TOKEN}`,
//         },
//       })
//         .then((r) => r.json())
//         .then((data) => {
//           if (!data || data.erro || !data.logradouro) {
//             setCepErro("CEP não encontrado!");
//             setRua("");
//             setBairro("");
//             setCidade("");
//             setEstado("");
//             return;
//           }

//           setRua(data.logradouro || "");
//           setBairro(data.bairro || "");
//           setCidade(data.cidade?.nome || "");
//           setEstado(data.estado?.sigla || "");
//         })
//         .catch((err) => {
//           console.error("Erro CEP:", err);
//           setCepErro("Erro ao buscar CEP!");
//         });
//     }
//   }

//   // Controle das seções
//   const [selectedSection, setSelectedSection] = useState("conta");
//   const [selectedSubSection, setSelectedSubSection] = useState("ativas");

//   return (
//     <div className="userpage-container">
//       <HeaderUser />

//       <div className="ajustepage">
//         {/* MENU LATERAL */}
//         <aside>
//           <picture className="fotoPerfil">
//             <img src={perfil} alt="" />
//             <legend>Olá, *nome usuario*</legend>
//           </picture>

//           <button
//             onClick={() => setSelectedSection("conta")}
//             className={`Infos ${selectedSection === "conta" ? "active" : ""}`}
//           >
//             Minha Conta
//           </button>

//           <button
//             onClick={() => {
//               setSelectedSection("compras");
//               setSelectedSubSection("ativas");
//             }}
//             className={`Infos ${selectedSection === "compras" ? "active" : ""}`}
//           >
//             Minhas Compras
//           </button>

//           <button
//             onClick={() => setSelectedSection("historico")}
//             className={`Infos ${
//               selectedSection === "historico" ? "active" : ""
//             }`}
//           >
//             Histórico
//           </button>
//         </aside>

//         {/* ÁREA PRINCIPAL */}
//         <main>
//           {/* SEÇÃO MINHA CONTA */}
//           {selectedSection === "conta" && (
//             <div className="Forms">
//               <h2>Minhas Informações</h2>
//               <hr />

//               <form className="formEditar">
//                 <div className="ajusteBlocoForm">
//                   {/* BLOCO ESQUERDO */}
//                   <div className="form-bloco">
//                     <h2>Informações pessoais</h2>

//                     <label>Nome:</label>
//                     <input type="text" />

//                     <label>Email:</label>
//                     <input type="email" />

//                     <label>Senha:</label>
//                     <input type="password" />

//                     <label>Confirme sua senha:</label>
//                     <input type="password" />

//                     <label>Foto de perfil:</label>
//                     <input type="file" />
//                   </div>

//                   {/* BLOCO DIREITO */}
//                   <div className="form-bloco">
//                     <h2>Endereço</h2>

//                     <label>CEP:</label>
//                     <input
//                       type="text"
//                       value={cep}
//                       onChange={handleCEPChange}
//                       maxLength={8}
//                     />
//                     {cepErro && <p className="erroCEP">{cepErro}</p>}

//                     <label>Rua:</label>
//                     <input
//                       type="text"
//                       value={rua}
//                       onChange={(e) => setRua(e.target.value)}
//                     />

//                     <label>Número:</label>
//                     <input type="text" />

//                     <label>Bairro:</label>
//                     <input
//                       type="text"
//                       value={bairro}
//                       onChange={(e) => setBairro(e.target.value)}
//                     />

//                     <label>Cidade:</label>
//                     <input
//                       type="text"
//                       value={cidade}
//                       onChange={(e) => setCidade(e.target.value)}
//                     />

//                     <label>Estado:</label>
//                     <input
//                       type="text"
//                       value={estado}
//                       onChange={(e) => setEstado(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="ajusteBtnEditar">
//                   <input type="submit" value="Salvar edição" />
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* SEÇÃO COMPRAS */}
//           {selectedSection === "compras" && (
//             <div className="compras">
//               <h2>Compras Ativas</h2>
//               <hr />

//               {selectedSubSection === "ativas" && (
//                 <div>
//                   <h3>Compras Ativas</h3>
//                   <p>Mostre aqui as compras que ainda não chegaram.</p>
//                 </div>
//               )}

//               {selectedSubSection === "historico" && (
//                 <div>
//                   <h3>Histórico de Compras</h3>
//                   <p>Mostre aqui as compras entregues.</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* SEÇÃO HISTÓRICO */}
//           {selectedSection === "historico" && (
//             <div className="compras">
//               <h2>Histórico de compras</h2>
//               <hr />
//               <p>Aqui fica o histórico completo de compras.</p>
//             </div>
//           )}
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// }
