import { useEffect, useState } from "react";
import { listarProdutos, adicionarAoCarrinho } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import "./produtos.css";

// CARROSSEL DE FOTOS
function Carousel({ fotos, nome }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
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

// GALERIA DE PRODUTOS COM PAGINAÇÃO
export default function GaleriaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [erro, setErro] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const produtosPorPagina = 9;
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      const result = await listarProdutos();
      if (result.ok) setProdutos(result.produtos);
    }
    carregar();
  }, []);

  async function handleAdicionar(id_produto) {
    const res = await adicionarAoCarrinho(id_produto, 1);

    if (res.ok) {
      setShowModal(false);
      alert("Produto adicionado!");
      navigate("/carrinho");
    } else {
      setErro(res.data?.erro || "Erro ao adicionar ao carrinho");
      setShowModal(true);
    }
  }

  // produtos da página atual
  const indexUltimoProduto = currentPage * produtosPorPagina;
  const indexPrimeiroProduto = indexUltimoProduto - produtosPorPagina;
  const produtosAtuais = produtos.slice(indexPrimeiroProduto, indexUltimoProduto);

  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

  return (
    <main className="galeriaProdutos">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div>
              <h3>Erro</h3>
              <p>{erro}</p>
              <a href="/login">Login</a>
            </div>
            <button onClick={() => setShowModal(false)}><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      )}

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
              <button className="favoritar" onClick={() => handleAdicionar(p.id_produto)}>
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </section>

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
