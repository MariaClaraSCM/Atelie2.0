import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listarProdutos } from "../../services/api";
import "./pageProdutos.css"
import Header from "../header/header";

// CARROSSEL DE FOTOS
function Carousel({ fotos, nome }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % fotos.length);
    }, 3000); // troca a cada 3 segundos
    return () => clearInterval(interval);
  }, [fotos.length]);

  return (
    <div className="carousel">
      <img src={fotos[index]} alt={nome} className="carousel-img-pedir" />
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

// PÁGINA DO PRODUTO
export default function ProdutoComprar() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    async function buscar() {
      const result = await listarProdutos();
      if (result.ok) {
        const item = result.produtos.find((p) => p.id_produto == id);
        setProduto(item);
      }
    }
    buscar();
  }, [id]);

  if (!produto) return <h2>Carregando...</h2>;

  return (
    <main className="produtoPage">
      <Header/>
      <div className="ajusteProdutoinfo">
        <div className="imgBox">
          {Array.isArray(produto.fotos) && produto.fotos.length > 1 ? (
            <Carousel fotos={produto.fotos} nome={produto.nm_produto} />
          ) : (
            <img
              src={produto.fotos?.[0] || produto.foto}
              alt={produto.nm_produto}
            />
          )}
        </div>

        <div className="infoProduto">
          <h1>{produto.nm_produto}</h1>
          <h2>R$ {produto.preco}</h2>
          <input type="number" />

          <div className="acoesCompra">
            <button className="btnComprar">Pedir agora</button>
            <button className="btnCarrinho">Adicionar ao carrinho</button>
          </div>
        </div>
      </div>

      <div className="descricao">
        <h3>Descrição</h3>

        <p>{produto.descricao}</p>
      </div>
    </main>
  );
}
