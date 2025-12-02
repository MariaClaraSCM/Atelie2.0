import { useState, useRef, useEffect } from "react";
import "./home.css";
import iconArtesanal from "../assets/home/iconArtesanal.svg";
import iconBoaQualidade from "../assets/home/iconBoaQualidade.svg";
import iconPensadoComAmor from "../assets/home/iconPensadoComAmor.svg";
import imgProdutos from "../assets/home/imgProdutos.png";
import imgEncomendas from "../assets/home/imgEncomendas.png";

export default function Home() {
    const trackRef = useRef(null);
    const [index, setIndex] = useState(0);
    const cardWidth = 380; // largura aproximada (ajuste se necessário)
    const totalCards = testemonials.length;

    // Pausar animação automática e movimentar manualmente
    function mover(direcao) {
        if (!trackRef.current) return;

        // Atualiza índice
        setIndex(prev => {
            let novo = prev + direcao;
            if (novo < 0) novo = totalCards - 1;
            if (novo >= totalCards) novo = 0;
            return novo;
        });

        // Pausa a animação
        trackRef.current.style.animation = "none";
    }

    // Reativa a animação automática após 4s parado
    useEffect(() => {
        if (!trackRef.current) return;

        const track = trackRef.current;
        track.style.transform = `translateX(${-index * cardWidth}px)`;

        const timeout = setTimeout(() => {
            track.style.animation = "scrollInfinito 20s infinite linear";
        }, 4000);

        return () => clearTimeout(timeout);
    }, [index]);
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-text">

                    <h1>Bolsas feitas à mão com amor.</h1>
                    <p>Aqui, cada peça é feita com amor, cuidado e um toque especial de carinho de vó. Produzimos bolsas, lancheiras e muito mais — tudo personalizado para encantar e facilitar o dia a dia da sua família.</p>
                    <a href="/verprodutos"><button className="hero-btn pronta-entrega">Ver produtos</button></a>
                    <button className="hero-btn encomendar">Encomendar produto</button>
                </div>
            </section>
            <section className="why-choose-us">
                <h1>Por que escolher nosso ateliê?</h1>
                <p>Porque entregamos qualidade e confiança com carinho, feito especialmente para você.</p>
                <div className="motives">
                    <div className="motive-card">
                        <div className="icon-margin">
                            <img src={iconArtesanal} alt="Artesanal — peça feita à mão, representando cuidado artesanal" />
                        </div>
                        <h2>Artesanal</h2>
                        <p>Cada peça do Ateliê Vó Egina é feita à mão, com atenção minuciosa aos detalhes.</p>
                    </div>
                    <div className="motive-card">
                        <div className="icon-margin">
                            <img src={iconBoaQualidade} alt="Boa Qualidade — durabilidade, beleza e acabamento impecável" />
                        </div>
                        <h2>Boa Qualidade</h2>
                        <p>Garantimos durabilidade, beleza e acabamento impecável em todos os nossos produtos.</p>
                    </div>
                    <div className="motive-card">
                        <div className="icon-margin">
                            <img src={iconPensadoComAmor} alt="Pensado com Amor — peça única, criada com atenção às preferências do cliente" />
                        </div>
                        <h2>Pensado com Amor</h2>
                        <p>Aqui, cada peça é única. Egina ouve o cliente e transforma ideias em produtos que aquecem o coração.</p>
                    </div>
                </div>
            </section>
            <section className="our-products">
                <h1>Nossos Produtos</h1>
                <p>Prático para o dia-a-dia e belo para um evento especial. Fazemos do seu jeitinho!</p>
                <div className="products">
                    <div className="product">
                        <img src={imgProdutos} alt="" />
                        <h3>Bolsas e Mais</h3>
                        <p>Explore: linha escolar, lembrancinhas, maternidade e muito mais, prontos para você escolher e se encantar.</p>
                        <a href="/verprodutos"><button className="product-btn pronta-entrega">Ver todos os produtos</button></a>
                    </div>
                    <div className="product">
                        <img src={imgEncomendas} alt="" />
                        <h3>Galeria de Encomendas</h3>
                        <p>Inspire-se com peças personalizadas por nossos clientes e peça a sua do jeitinho que quiser.</p>
                        <button className="product-btn galeria">Ir para a Galeria</button>
                    </div>
                </div>
            </section>
            <section className="testemonials">
                <h1>Depoimentos</h1>
                <div className="container-carrossel">
                    <button id="btn-voltar" onClick={() => mover(-1)}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div className="carrossel">
                        <div id="track" className="testemonial-messages" ref={trackRef}>
                            {
                                testemonials.map((testemonial, index) => (
                                    <div className="testemonial-card" key={index}>
                                        <div className="info-user">
                                            <img className="placeholder" src={testemonial.photo} alt="User photo" />
                                            <span>{testemonial.name}</span>
                                        </div>
                                        <ul className="review-stars">
                                            {Array.from({ length: testemonial.rating }).map((_, i) => (
                                                <li key={i}><i className="fa-solid fa-star"></i></li>
                                            ))}
                                        </ul>
                                        <p>{testemonial.message}</p>
                                    </div>
                                ))
                            }
                            {
                                testemonials.map((testemonial, index) => (
                                    <div className="testemonial-card" key={index} aria-hidden>
                                        <div className="info-user">
                                            {/* <canvas >{testemonial.photo}</canvas> */}
                                            <img className="placeholder" src={testemonial.photo} alt="User photo" />
                                            <span>{testemonial.name}</span>
                                        </div>
                                        <ul className="review-stars">
                                            {Array.from({ length: testemonial.rating }).map((_, i) => (
                                                <li key={i}><i className="fa-solid fa-star"></i></li>
                                            ))}
                                        </ul>
                                        <p>{testemonial.message}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button id="btn-proximo" onClick={()=>mover(1)}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            </section>
            <section className="contato">
                <div className="contato-cta">
                    <h2>Deseja encomendar?</h2>
                    <p>Entre em contato pelo Whatsapp</p>
                    <button><i class="fa-brands fa-whatsapp"></i>Whatsapp</button>
                </div>
            </section>
        </div>
    )
}

const testemonials = [
    {
        photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
        name: 'Ana',
        rating: 5,
        message: 'Recebi minha encomenda exatamente como pedi. Acabamento impecável. Valeu muito a pena!'
    },
    {
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
        name: 'Brenda',
        rating: 5,
        message: 'A qualidade superou minhas expectativas. Atendimento rápido e muito profissional.'
    },
    {
        photo: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe',
        name: 'Clara',
        rating: 5,
        message: 'Produto lindo e muito bem feito. Com certeza comprarei novamente.'
    },
]