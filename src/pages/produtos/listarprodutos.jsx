import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { listarProdutos } from "../../services/api";
import "./pageProdutos.css";

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

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function get() {
      const result = await listarProdutos();
      if (result.ok) setProdutos(result.produtos);
    }
    get();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const produtosPorPagina = 9;
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      const result = await listarProdutos();
      if (result.ok) setProdutos(result.produtos);
    }
    carregar();
  }, []);

  // produtos da página atual
  const indexUltimoProduto = currentPage * produtosPorPagina;
  const indexPrimeiroProduto = indexUltimoProduto - produtosPorPagina;
  const produtosAtuais = produtos.slice(
    indexPrimeiroProduto,
    indexUltimoProduto
  );

  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

  return (
    <section className="listaProdutos">
      <h1>Coleção de produtos</h1>

      <div className="gridProdutos">
        {produtos.map((p) => (
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
                <p>
                  <b>R$ {p.preco}</b>
                </p>
                <p>
                  <b>Categoria:</b> {p.nm_categoria}
                </p>
              </div>
            </div>

            <div className="ajustebtnVerMais">
              <Link to={`/comprar/${p.id_produto}`}>
                <button className="btnVerMais">Ver mais</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

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
    </section>
  );
}
