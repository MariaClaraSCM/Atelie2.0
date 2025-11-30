import { useEffect, useState } from "react";
import { adicionarAoCarrinho, listarProdutos } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import "./produtos.css";

// CARROSSEL
function Carousel({ fotos, nome }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!fotos || fotos.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % fotos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [fotos.length]);

  return (
    <div className="carousel">
      <img src={fotos[index]} alt={nome} className="carousel-img" />
      <div className="radio-buttons">
        {fotos.map((_, i) => (
          <input
            key={i}
            type="radio"
            name={nome}
            checked={i === index}
            onChange={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

// GALERIA
export default function GaleriaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const produtosPorPagina = 9;
  const navigate = useNavigate();

  // Modal
  const [modal, setModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    async function carregar() {
      const result = await listarProdutos();
      if (result.ok) setProdutos(result.produtos);
    }
    carregar();
  }, []);

  const indexUltimoProduto = currentPage * produtosPorPagina;
  const indexPrimeiroProduto = indexUltimoProduto - produtosPorPagina;
  const produtosAtuais = produtos.slice(indexPrimeiroProduto, indexUltimoProduto);

  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

    function definirProdutoAddCarrinho(produto) {
        setProdutoSelecionado(produto);  
        setModal(true);                  
    }

// Adicionar ao carrinho
    async function AdicionarProdutoAoCarrinho(p) {
        try {
            const resp = await adicionarAoCarrinho(p.id_produto, 1);

            if (resp && resp.ok) {
                console.log(resp);
                
                console.log("Produto adicionado.");
                setModal(false); 
                setProdutoSelecionado(null);
                navigate("/carrinho");
            } else {
                console.error("Erro ao adicionar:", resp?.data || resp);
            }
        } catch (err) {
            console.error("Erro:", err);
        }
    }


  return (
    <main className="galeriaProdutos">
      <section className="gridProdutos">
        {produtosAtuais.map((p) => (
          <div key={p.id_produto} className="produtoAdm">
            
            {Array.isArray(p.fotos) && p.fotos.length > 1 ? (
              <Carousel fotos={p.fotos} nome={p.nm_produto} />
            ) : (
              <img src={p.fotos?.[0] || p.foto} alt={p.nm_produto} />
            )}

            <div className="info">
              <h2>{p.nm_produto}</h2>
              <p>{p.descricao}</p>
              <div className="ajusteCardProduto">
                <p><b>R$ {p.preco}</b></p>
                <p><b>Categoria:</b> {p.nm_categoria}</p>
              </div>
            </div>

            <div className="acoesAdm">
              <button className="favoritar"></button>
              <button className="add-carrinho" onClick={() => definirProdutoAddCarrinho(p)}>Add Carrinho</button>
            </div>
          </div>
        ))}
      </section>

      {/* MODAL */}
      {modal && produtoSelecionado && (
        <div className="modalProduto" onClick={() => setModal(false)}>
          <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
            
            {Array.isArray(produtoSelecionado.fotos) &&
            produtoSelecionado.fotos.length > 1 ? 
                (<Carousel fotos={produtoSelecionado.fotos} nome={produtoSelecionado.nm_produto}/>) 
                : 
                (<img src={produtoSelecionado.fotos?.[0] || produtoSelecionado.foto} alt={produtoSelecionado.nm_produto}/>
            )}

            <div className="info">
              <h2>{produtoSelecionado.nm_produto}</h2>
              <p>{produtoSelecionado.descricao}</p>
              <div className="ajusteCardProduto">
                <p><b>Preço:</b> R${produtoSelecionado.preco}</p>
                <p><b>Categoria:</b> {produtoSelecionado.nm_categoria}</p>
                <p><b>Tamanho:</b> {produtoSelecionado.qt_tamanho}</p>
                <p><b>Compra: </b>{produtoSelecionado.tipo}</p>
              </div>
              <button onClick={() => AdicionarProdutoAoCarrinho(produtoSelecionado)}>Confirmar</button>
            </div>

            <button onClick={() => setModal(false)}><i className="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      )}

      {/* PAGINAÇÃO */}
      <div className="paginacao">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "ativo" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
}
