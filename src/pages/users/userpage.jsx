import { useState } from "react";
import HeaderUser from "../header/headeruser.jsx";
import Footer from "../footer/footer.jsx";
import perfil from "../../assets/perfil.jfif";
import "./userpage.css";

export default function UserPage() {
  // Estados do CEP
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cepErro, setCepErro] = useState("");

  function handleCEPChange(e) {
    const value = e.target.value.replace(/\D/g, "");
    setCep(value);

    // limpa mensagens anteriores
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
            setRua("");
            setBairro("");
            setCidade("");
            setEstado("");
            return;
          }

          setRua(data.logradouro || "");
          setBairro(data.bairro || "");
          setCidade(data.cidade?.nome || "");
          setEstado(data.estado?.sigla || "");
        })
        .catch((err) => {
          console.error("Erro CEP:", err);
          setCepErro("Erro ao buscar CEP!");
        });
    }
  }

  // Controle das seções
  const [selectedSection, setSelectedSection] = useState("conta");
  const [selectedSubSection, setSelectedSubSection] = useState("ativas");

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
        </aside>

        <hr />

        {/* ÁREA PRINCIPAL */}
        <main>
          {/* SEÇÃO MINHA CONTA */}
          {selectedSection === "conta" && (
            <div className="Forms">
              <h2>Minhas Informações</h2>
              <hr />

              <form className="formEditar">
                <div className="ajusteBlocoForm">
                  {/* BLOCO ESQUERDO */}
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

                  {/* BLOCO DIREITO */}
                  <div className="form-bloco">
                    <h2>Endereço</h2>

                    <label>CEP:</label>
                    <input
                      type="text"
                      value={cep}
                      onChange={handleCEPChange}
                      maxLength={8}
                    />
                    {cepErro && <p className="erroCEP">{cepErro}</p>}

                    <label>Rua:</label>
                    <input
                      type="text"
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                    />

                    <label>Número:</label>
                    <input type="text" />

                    <label>Bairro:</label>
                    <input
                      type="text"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                    />

                    <label>Cidade:</label>
                    <input
                      type="text"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    />

                    <label>Estado:</label>
                    <input
                      type="text"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ajusteBtnEditar">
                  <input type="submit" value="Salvar edição" />
                </div>
              </form>
            </div>
          )}

          {/* SEÇÃO COMPRAS */}
          {selectedSection === "compras" && (
            <div className="compras">
              <h2>Compras Ativas</h2>
            </div>
          )}

          {/* SEÇÃO HISTÓRICO */}
          {selectedSection === "historico" && (
            <div className="compras">
              <h2>Histórico de compras</h2>
              <hr />
              <p>Aqui fica o histórico completo de compras.</p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
