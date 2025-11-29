import { useEffect, useState } from "react";
import { listarCarrinho, atualizarQuantidadeCarrinho, removerDoCarrinho } from "../../../services/api";
import "./carrinho.css";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
        carregarCarrinho();
  }, []);

    async function carregarCarrinho() {
        setLoading(true);
        const res = await listarCarrinho();

    if (res.ok && Array.isArray(res.data)) {
        setItens(res.data);
        setErro(null);
    }
    // else {
    //     setItens([]);
    //     setErro(res.data?.erro || "Erro ao carregar carrinho");
    //     setShowModal(true);
    //     const navigate = useNavigate();
    //     navigate("/verprodutos");
    // }

    setLoading(false);
  }

  async function alterarQuantidade(item, delta) {
    const novaQuantidade = item.quantidade + delta;
    if (novaQuantidade < 1) return;

    const res = await atualizarQuantidadeCarrinho(item.id_item_carrinho, novaQuantidade);
    if (res.ok) carregarCarrinho();
  }

  async function removerItem(item) {
    const res = await removerDoCarrinho(item.id_item_carrinho);
    if (res.ok) carregarCarrinho();
  }

//   if (loading) return <p>Carregando carrinho...</p>;

  return (
    <div className="carrinho-container">
      <h2>Meu Carrinho</h2>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Erro</h3>
            <p>{erro}</p>
            <button onClick={() => setShowModal(false)}>X</button>
          </div>
        </div>
      )}

      {itens.length === 0 && !erro && <p>Seu carrinho está vazio</p>}

      <div className="carrinho-lista">
        {itens.map(item => (
          <div key={item.id_item_carrinho} className="carrinho-item">
            <img src={item.fotos?.[0] || ""} alt={item.nm_produto} className="carrinho-foto" />

            <div className="carrinho-info">
              <h3>{item.nm_produto}</h3>
              <p>{item.descricao}</p>
              {item.cor_item && <p><b>Cor:</b> {item.cor_item}</p>}
              {item.nm_personagem && <p><b>Personagem:</b> {item.nm_personagem}</p>}
              <p><b>Preço:</b> R$ {item.preco.toFixed(2)}</p>
            </div>

            <div className="carrinho-acoes">
              <button onClick={() => alterarQuantidade(item, -1)}>-</button>
              <span>{item.quantidade}</span>
              <button onClick={() => alterarQuantidade(item, 1)}>+</button>
              <button onClick={() => removerItem(item)}>Remover</button>
            </div>
          </div>
        ))}
      </div>

      <div className="carrinho-total">
        <h3>
          Total: R$ {Array.isArray(itens) ? itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0).toFixed(2) : "0.00"}
        </h3>
      </div>
    </div>
  );
}