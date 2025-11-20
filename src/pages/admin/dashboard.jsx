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
// páginas
import AdmEstatisticas from "./estatisticas.jsx";
import AdmConfiguracoes from "./configuracoes.jsx";

export default function AdmDashboard() {
    const[secao, setSecao] = useState("estatisticas");

    const handleClick = (secao) => {
        setSecao(secao);
    };

    return (
        <div className="admin-dashboard">
            
            <aside className="sidebar">
                <ul className="sidebar-menu">
                    <h3 className="sidebar-title">Atalhos</h3>
                    <li onClick={() => handleClick("estatisticas")}>
                        <img src={estatistica} alt="pie chart" className="icon" />
                        <span className="links">Estatísticas</span>
                    </li>
                    <li onClick={() => handleClick("produtos")}>
                        <img src={produto} alt="pie chart" className="icon"/>
                        <span className="links">Produtos</span>
                    </li>
                    <li onClick={()=> handleClick("pedidos")}>
                        <img src={pedidos} alt="pie chart" className="icon"/>
                        <span className="links">Pedidos</span>
                    </li>
                    <li onClick={()=> handleClick("galeria")}>
                        <img src={galeria} alt="pie chart" className="icon"/>
                        <span className="links">Galeria</span>
                    </li>
                    <li onClick={()=> handleClick("financeiro")}>
                        <img src={financeiro} alt="pie chart" className="icon"/>
                        <span className="links">Financeiro</span>
                    </li>
                    <li onClick={()=> handleClick("clientes")}>
                        <img src={clientes} alt="pie chart" className="icon"/>
                        <span className="links">Clientes</span>
                    </li>
                    <li onClick={()=> handleClick("configuracoes")}>
                        <img src={config} alt="pie chart" className="icon"/>
                        <span className="links">Configurações</span>
                    </li>
                </ul>
            </aside>
            <main className="content">
                <header className="header">
                    <h3>Bem-vinda, *Nome do adm*!</h3>
                    <a href="/">Home</a>
                    <button className="btn-novo">
                        <span className="material-symbols-outlined iconMais">add</span>
                        Novo Pedido
                    </button>
                </header>
                <section className="cards-area">
                    {secao === "estatisticas" && (
                        <AdmEstatisticas />
                    )}
                    {secao === "produtos" && (
                        <div>
                            <div className="ajusteHeaderprodutos">
                                <h2>Produtos</h2>
                                <button><Link to="/addproduto">Adicionar novo produto</Link></button>
                            </div>

                            <div className="">
                                <h1>QUando cria, aparece aqui</h1>
                            </div>
                        </div>
                    )}
                    {secao === "pedidos" && (
                        <div>
                            <h2>Pedidos</h2>
                            </div>
                    )}
                    {secao ==="galeria" && (
                        <div>
                            <h2>Galeria</h2>
                        </div>
                    )}
                    {secao === "financeiro" && (
                        <div>
                            <h2>Financeiro</h2>
                        </div>
                    )}
                    {secao === "clientes" && (
                        <div>
                            <h2>Clientes</h2>
                        </div>
                    )}
                    {secao === "configuracoes" && (
                        <AdmConfiguracoes />
                    )}
                </section>
            </main>

        </div>
    );
}