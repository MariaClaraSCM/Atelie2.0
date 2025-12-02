import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { exibirCarrinho, atualizarQuantidade } from "../../../services/api";
import "./carrinho.css";

export default function Carrinho() {
    const [itens, setItens] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        carregarCarrinho();
    }, [location.pathname]);

    async function carregarCarrinho() {
        const resp = await exibirCarrinho();
        setItens(resp);
    }

    async function alterarQuantidade(item, novaQtd) {
        if (novaQtd < 1) return;

        await atualizarQuantidade(item.id_item_carrinho, novaQtd);
        carregarCarrinho(); // atualiza automaticamente
    }

    return (
        <div className="carrinho-body">
            <div className="carrinho-header">
                <a href="/verprodutos">Voltar</a>
                <h2>Carrinho</h2>
            </div>

            <section className="carrinho-main">
                {itens.length === 0 && <p>Carrinho vazio</p>}

                {itens.map(item => (
                    <div key={item.id_item_carrinho} className="carrinho-produto">
                        <img src={item.primeira_foto} className="carrinho-foto" />
                        <div className="carrinho-info">
                        <div>
                            <h4>{item.nome_produto}</h4>
                            <p>{item.descricao}</p>
                            <p><b>Preço unitário:</b> R${item.preco_unitario}</p>
                            <p><b>Preço Total: </b>R${item.preco_total}</p>

                        </div>
                        <div className="controles-qtd">
                            <button onClick={() => alterarQuantidade(item, item.quantidade - 1)}>-</button>
                            <p>{item.quantidade}</p>
                            <button onClick={() => alterarQuantidade(item, item.quantidade + 1)}>+</button>
                        </div>
                        <div>
                            <button className="btn-remover" onClick={() => remover(item.id_item_carrinho) && navigate("/carrinho")}>Remover</button>
                        </div>
                        </div>
                    </div>
                ))}

                <button>Efetuar Pedido</button>
            </section>
        </div>
    );
}
