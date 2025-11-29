import { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import estatistica from "../../assets/adm/iconEstatistica.svg";
import produto from "../../assets/adm/iconProdutos.svg";
import pedidos from "../../assets/adm/iconPedidos.svg";
import galeria from "../../assets/adm/iconGaleria.svg";
import financeiro from "../../assets/adm/iconFinanceiro.svg";
import clientes from "../../assets/adm/iconClientes.svg";
import config from "../../assets/adm/iconConfig.svg";
//paginas
import AdmEstatisticas from "./estatisticas.jsx";
import AdmConfiguracoes from "./configuracoes.jsx";
import CategoriaModal from "./categoriaModal.jsx";
import CategoriasList from "./categoriasList.jsx";
import AdmListarProdutos from "./produtoslist.jsx";
import AdmClientes from "./clientesLista.jsx";

export default function AdmDashboard() {
  const [secao, setSecao] = useState("estatisticas");
  const [modalOpen, setModalOpen] = useState(false); // ← ADICIONADO

  const handleClick = (secao) => {
    setSecao(secao);
  };

  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <h3 className="sidebar-title">Atalhos</h3>

          <li onClick={() => handleClick("estatisticas")}>
            <img src={estatistica} alt="pie chart" className="icon" />
            <span className="links">Estatísticas</span>
          </li>

          <li onClick={() => handleClick("categorias")}>
            <span className="links">Categorias</span>
          </li>

          <li onClick={() => handleClick("produtos")}>
            <img src={produto} alt="pie chart" className="icon" />
            <span className="links">Produtos</span>
          </li>

          <li onClick={() => handleClick("pedidos")}>
            <img src={pedidos} alt="pie chart" className="icon" />
            <span className="links">Pedidos</span>
          </li>

          <li onClick={() => handleClick("galeria")}>
            <img src={galeria} alt="pie chart" className="icon" />
            <span className="links">Galeria</span>
          </li>

          <li onClick={() => handleClick("financeiro")}>
            <img src={financeiro} alt="pie chart" className="icon" />
            <span className="links">Financeiro</span>
          </li>

          <li onClick={() => handleClick("clientes")}>
            <img src={clientes} alt="pie chart" className="icon" />
            <span className="links">Clientes</span>
          </li>

          <li onClick={() => handleClick("configuracoes")}>
            <img src={config} alt="pie chart" className="icon" />
            <span className="links">Configurações</span>
          </li>
        </ul>
      </aside>

      <main className="content">
        <header className="header">
          <h3>Bem-vinda, Usuário!</h3>

          {/* CORRIGIDO — removido <a> em volta */}
          <Link to="/">Home</Link>

          <button className="btn-novo">
            <i class="fa-solid fa-plus"></i>
            Novo Pedido
          </button>
        </header>

        <section className="cards-area">
          {secao === "estatisticas" && <AdmEstatisticas />}

          {secao === "categorias" && (
            <div>
              <div className="ajusteCabecalho">
                <h2>Categorias</h2>

                <button
                  onClick={() => setModalAberto(true)}
                  className="addCategoria"
                >
                  Adicionar Categoria
                </button>
              </div>

              {modalAberto && (
                <CategoriaModal onClose={() => setModalAberto(false)} />
              )}

              <CategoriasList />
            </div>
          )}

          {secao === "produtos" && (
            <div>
              <div className="ajusteHeaderprodutos">
                <div className="ajusteCabecalho">
                  <h2>Produtos</h2>
                  <button className="addCategoria">
                    <Link to="/addproduto">Adicionar novo produto</Link>
                  </button>
                </div>
              </div>

              <AdmListarProdutos />
            </div>
          )}

          {secao === "pedidos" && <h2>Pedidos</h2>}
          {secao === "galeria" && <h2>Galeria</h2>}
          {secao === "financeiro" && <h2>Financeiro</h2>}
          {secao === "clientes" && (
            <div>
              <h2>Clientes</h2>

              <AdmClientes />
            </div>
          )}
          {secao === "configuracoes" && <AdmConfiguracoes />}
        </section>
      </main>
    </div>
  );
}
