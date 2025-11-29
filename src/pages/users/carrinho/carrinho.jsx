import "./carrinho.css";

export default function Carrinho() {
    return (
        <div className="carrinho">
            <span>Se não tiver conta, não pode acessar carrinho</span>
            <div className="carrinho-body">
                <section className="carrinho-header">
                    <a href="/verprodutos"><i class="fa-solid fa-arrow-left"></i>Voltar</a>
                    <h2>Carrinho</h2>
                </section>
                <section className="carrinho-main">
                    <div className="carrinho-produto">
                        <div className="carrinho-foto"></div>
                        <div className="carrinho-info">
                            <h3>Produto 1</h3>
                            <p>Descrição do produto 1</p>
                            <span>R$ 100,00</span>
                        </div>
                        <div className="carrinho-botoes-acao">
                            <button className="remover">Remover</button>
                            <div className="quantidade">
                                <button className="diminuir">-</button>
                                <span>1</span>
                                <button className="aumentar">+</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}