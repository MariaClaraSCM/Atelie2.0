import "./home.css";
import iconArtesanal from "../assets/home/iconArtesanal.svg";
import iconBoaQualidade from "../assets/home/iconBoaQualidade.svg";
import iconPensadoComAmor from "../assets/home/iconPensadoComAmor.svg";
import imgProdutos from "../assets/home/imgProdutos.png";
import imgEncomendas from "../assets/home/imgEncomendas.png";

export default function Home() {
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
                    <button id="btn-voltar">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div className="carrossel">
                        <div className="testemonial-messages">
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
                    <button id="btn-proximo"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            </section>
        </div>
    )
}

const testemonials = [
    {
        photo: 'https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png',
        name: 'Ana',
        rating: 5,
        message: 'Adorei minha bolsa personalizada! A qualidade é incrível e o atendimento foi super atencioso. Recomendo muito!'
    },
    {
        photo: 'https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png',
        name: 'Brenda',
        rating: 5,
        message: 'Adorei minha bolsa personalizada! A qualidade é incrível e o atendimento foi super atencioso. Recomendo muito!'
    },
    {
        photo: 'https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png',
        name: 'Clara',
        rating: 5,
        message: 'Adorei minha bolsa personalizada! A qualidade é incrível e o atendimento foi super atencioso. Recomendo muito!'
    },
]