import { useEffect, useState } from "react";
import { listarProdutos } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

//CARROSSEL DE FOTOS:
function Carousel({ fotos, nome }) {
  const [index, setIndex] = useState(0);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % fotos.length);
    }, 3000); // troca a cada 3 segundos

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

export default function AdmListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      const result = await listarProdutos();
      if (result.ok) setProdutos(result.produtos);
    }
    carregar();
  }, []);

  return (
    <main className="admProdutos">
      <h1>Todos os produtos</h1>

      <section className="listaProdutosAdm">
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

            <div className="acoesAdm">
              <button
                className="editarProduto"
                onClick={() => navigate(`/editar-produto/${p.id_produto}`)}
              >
                Editar
              </button>

              <button className="excluirProduto">Excluir</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
