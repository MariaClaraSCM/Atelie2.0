import { useState } from "react";
import HeaderUser from "../header/headeruser.jsx";
import Footer from "../footer/footer.jsx";
import perfil from "../../assets/perfil.jfif";
import "./userpage.css";

export default function UserPage() {
  const [selectedSection, setSelectedSection] = useState("conta");
  const [selectedSubSection, setSelectedSubSection] = useState("ativas");

  return (
    <div>
      <HeaderUser />

      <div className="ajustepage">
        {/* MENU LATERAL */}
        <aside>
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
            onClick={() => setSelectedSection("compras")}
            className={`Infos ${selectedSection === "compras" ? "active" : ""}`}
          >
            Minhas Compras
          </button>
        </aside>

        <hr />
        {/* ÁREA PRINCIPAL */}
        <main>
          {/* CONTEÚDO PRINCIPAL */}
          {selectedSection === "conta" && (
            <div>
              <h2>Minhas Informações</h2>
              <p>Aqui você pode colocar os dados editáveis do usuário.</p>
            </div>
          )}

          {selectedSection === "compras" && (
            <div className="compras">
              {/* SUBMENU */}
              <div className="subMenuCompras">
                <button
                  type="button"
                  onClick={() => {
                    console.log("clicou ativas");
                    setSelectedSubSection("ativas");
                  }}
                  className={`btnCompras ${
                    selectedSubSection === "ativas" ? "ativo" : ""
                  }`.trim()}
                >
                  Compras Ativas
                </button>

                <button
                  type="button"
                  onClick={() => {
                    console.log("clicou historico");
                    setSelectedSubSection("historico");
                  }}
                  className={`btnCompras ${
                    selectedSubSection === "historico" ? "ativo" : ""
                  }`.trim()}
                >
                  Histórico
                </button>
              </div>

              <hr />

              {/* CONTEÚDO DAS SUBSEÇÕES */}
              {selectedSubSection === "ativas" && (
                <div>
                  <h3>Compras Ativas</h3>
                  <p>Mostre aqui as compras que ainda não chegaram.</p>
                </div>
              )}

              {selectedSubSection === "historico" && (
                <div>
                  <h3>Histórico de Compras</h3>
                  <p>Mostre todas as compras entregues.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}