import { useEffect, useState } from "react";
import { exibirCarrinho as apiExibirCarrinho } from "../../../services/api";
import "./carrinho.css";

export default function Carrinho() {

    const [itens, setItens] = useState([]);

    useEffect(() => {
        carregarCarrinho();
    }, []);

    async function carregarCarrinho() {
        const resp = await apiExibirCarrinho();
        console.log("Itens do carrinho:", resp);
        setItens(resp);
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
                    <img
                        src={"http://localhost/api/uploads/produtos/${item.primeira_foto}"}
                        // src={item.primeira_foto}
                        // src={}
                        className="carrinho-foto"
                    />
                    <p>{item.nome_produto}</p>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Preço Total: R${item.preco_total}</p>
                    {/* <hr /> */}
                </div>
            ))}
            <button>Efetuar Pedido</button>
            </section>
        </div>
    );
}
