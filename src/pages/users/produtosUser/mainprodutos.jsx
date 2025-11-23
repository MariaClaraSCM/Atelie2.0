import { useState } from "react";
import bolsa from "../../../assets/produtos/bolsa.svg";
import fav from "../../../assets/produtos/fav.svg";

export default function MainProdutos() {
  const produtosPorPagina = 8;
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [favoritos, setFavoritos] = useState([]);

  // PRODUTOS FAKES (depois  troca pelos do banco)
  const produtos = [
    {
      id: 1,
      nome: "Bolsa 1",
      categoria: "Mochila",
      descricao: "Descrição",
      preco: "50,00",
    },
    {
      id: 2,
      nome: "Bolsa 2",
      categoria: "Estojo",
      descricao: "Descrição",
      preco: "60,00",
    },
    {
      id: 3,
      nome: "Bolsa 3",
      categoria: "Lembrancinha",
      descricao: "Descrição",
      preco: "70,00",
    },
    {
      id: 4,
      nome: "Bolsa 4",
      categoria: "Máscara",
      descricao: "Descrição",
      preco: "40,00",
    },
    {
      id: 5,
      nome: "Bolsa 5",
      categoria: "Mochila",
      descricao: "Descrição",
      preco: "55,00",
    },
    {
      id: 6,
      nome: "Bolsa 6",
      categoria: "Estojo",
      descricao: "Descrição",
      preco: "65,00",
    },
    {
      id: 7,
      nome: "Bolsa 7",
      categoria: "Lembrancinha",
      descricao: "Descrição",
      preco: "75,00",
    },
    {
      id: 8,
      nome: "Bolsa 8",
      categoria: "Máscara",
      descricao: "Descrição",
      preco: "45,00",
    },

    {
      id: 9,
      nome: "Bolsa 9",
      categoria: "Mochila",
      descricao: "Descrição",
      preco: "80,00",
    },
    {
      id: 10,
      nome: "Bolsa 10",
      categoria: "Estojo",
      descricao: "Descrição",
      preco: "90,00",
    },
    {
      id: 11,
      nome: "Bolsa 11",
      categoria: "Lembrancinha",
      descricao: "Descrição",
      preco: "55,00",
    },
    {
      id: 12,
      nome: "Bolsa 12",
      categoria: "Máscara",
      descricao: "Descrição",
      preco: "65,00",
    },
  ];

  const indexFinal = paginaAtual * produtosPorPagina;
  const indexInicial = indexFinal - produtosPorPagina;
  const produtosAtuais = produtos.slice(indexInicial, indexFinal);

  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

  function favoritar(id) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((fav) => fav !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  }

  return (
    <>
      <main className="mainProdutos">
        {produtosAtuais.map((produto) => (
          <div className="divp" key={produto.id}>
            <img src={bolsa} alt="Bolsa" />

            <p>
              <b>{produto.nome}</b>
            </p>

            <p>
              #{produto.id} - {produto.categoria}
            </p>

            <p>{produto.descricao}</p>

            <p>
              <b>R${produto.preco}</b>
              <button
                className="NFav"
                onClick={() => favoritar(produto.id)}
                style={{
                  backgroundColor: favoritos.includes(produto.id)
                    ? "#ff5fa2"
                    : "#EED0F2",
                }}
              >
                <img src={fav} alt="Favoritar" />
              </button>
            </p>
          </div>
        ))}
      </main>

      {/* PAGINAÇÃO */}
      <div className="paginacao">
        {/* botao voltar */}
        <button
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="pagina"
        >
          ⬅
        </button>

        {/* numero da pagina */}
        {Array.from({ length: totalPaginas }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPaginaAtual(index + 1)}
            className={paginaAtual === index + 1 ? "pagina ativa" : "pagina"}
          >
            {index + 1}
          </button>
        ))}

        {/* botão avancar  */}
        <button
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className="pagina"
        >
          ➡
        </button>
      </div>
    </>
  );
}
