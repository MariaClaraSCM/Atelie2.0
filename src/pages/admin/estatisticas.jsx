import React, { useEffect, useState } from "react";
import { contarProdutos, contarPedidos, contarClientes } from "../../services/api.js";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function AdmEstatisticas() {
    let navigate = useNavigate();

    const [totalProdutos, setTotalProdutos] = useState(0);
    const [totalPedidos, setTotalPedidos] = useState(0);
    const [totalClientes, setTotalClientes] = useState(0);

    useEffect(() => {
        async function carregarTotais() {
            const p = await contarProdutos();
            const d = await contarPedidos();
            const c = await contarClientes();

            setTotalProdutos(p);
            setTotalPedidos(d);
            setTotalClientes(c);
        }

        carregarTotais();
    }, []);

    return (
        <div className="estatisticas-dashboard">
            <section className="insights">

                <div className="card-total-pedidos">
                    <p>Total de Produtos</p>
                    <h2>{totalProdutos}</h2>
                    {/* <p>+12% que semestre passado</p> */}
                </div>

                <div className="card-total-pedidos">
                    <p>Total de Pedidos</p>
                    <h2>{totalPedidos}</h2>
                    {/* <p>+12% que semestre passado</p> */}
                </div>

                <div className="card-total-pedidos">
                    <p>Total de Clientes</p>
                    <h2>{totalClientes}</h2>
                    {/* <p>+12% que semestre passado</p> */}
                </div>

            </section>

            <section className="quickActions">
                <h3>Ações Rápidas</h3>
                <div className="actions">
                    <button onClick={()=>navigate("/addproduto")}><i class="fa-solid fa-plus"></i>Adicionar Produto</button>
                    <button onClick={()=>navigate("/dashboard")}><i class="fa-solid fa-plus"></i>Adicionar Categoria</button>
                    {/* <button><i class="fa-solid fa-plus"></i>Adicionar Cliente</button> */}
                </div>
            </section>
        </div>
    );
}
