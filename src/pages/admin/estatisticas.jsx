import React from "react";
import "./dashboard.css";

export default function AdmEstatisticas() {
    return (
        <div className="estatisticas-dashboard">
            <section className="insights">
                <div className="card-total-pedidos">
                    <p>Total de Pedidos</p>
                    <h2>150</h2>
                    <p>+12% que semestre passado</p>
                </div>
                <div className="card-total-pedidos">
                    <p>Total de Pedidos</p>
                    <h2>150</h2>
                    <p>+12% que semestre passado</p>
                </div>
                <div className="card-total-pedidos">
                    <p>Total de Pedidos</p>
                    <h2>150</h2>
                    <p>+12% que semestre passado</p>
                </div>
            </section>
            <section className="quickActions">
                <h3>Ações Rápidas</h3>
                <div className="actions">
                    <button>Adicionar Produto</button>
                    <button>Adicionar Produto</button>
                    <button>Adicionar Produto</button>
                </div>
            </section>
        </div>
    );
}