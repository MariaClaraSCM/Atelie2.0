import "./home.css";
import { Link } from "react-router-dom";
import iconArtesanal from "../assets/home/iconArtesanal.svg";
import iconBoaQualidade from "../assets/home/iconBoaQualidade.svg";
import iconPensadoComAmor from "../assets/home/iconPensadoComAmor.svg";
import imgProdutos from "../assets/home/imgProdutos.png";
import imgEncomendas from "../assets/home/imgEncomendas.png";

export default function Home(){
    return(
        <div className="home">
            <section className="hero">
                <div className="hero-text">

                    <h1>Bolsas feitas à mão com amor.</h1>
                    <p>Aqui, cada peça é feita com amor, cuidado e um toque especial de carinho de vó. Produzimos bolsas, lancheiras e muito mais — tudo personalizado para encantar e facilitar o dia a dia da sua família.</p>
                    <button className="hero-btn pronta-entrega"><Link to="/verprodutos">Ver produtos</Link></button>
                    <button className="hero-btn encomendar"><Link to="/produtos">Encomendar produto</Link></button>
                </div>
            </section>
            <section className="why-choose-us" id="why-choose-us">
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
            <section className="our-products" id="our-products">
                <h1>Nossos Produtos</h1>
                <p>Prático para o dia-a-dia e belo para um evento especial. Fazemos do seu jeitinho!</p>
                <div className="products">
                    <div className="product">
                        <img src={imgProdutos} alt="" />
                        <h3>Bolsas e Mais</h3>
                        <p>Explore: linha escolar, lembrancinhas, maternidade e muito mais, prontos para você escolher e se encantar.</p>
                        <button className="product-btn pronta-entrega"><Link to="/produtos">Ver todos os produtos</Link></button>
                    </div>
                    <div className="product">
                        <img src={imgEncomendas} alt="" />
                        <h3>Galeria de Encomendas</h3>
                        <p>Inspire-se com peças personalizadas por nossos clientes e peça a sua do jeitinho que quiser.</p>
                        <button className="product-btn galeria"><Link to="/verprodutos">Ir para a Galeria</Link></button>
                    </div>
                </div>
            </section>
            <section className="testimonials">
                <h1>Depoimentos</h1>
                <div className="testimonials-carousel">
                    <button>bef</button>
                    <div className="testimonial-messages">
                        <div className="testimonial-card">
                            <div className="info-user">
                                <canvas className="placehoder"></canvas>
                                <span>Maria</span>
                            </div>
                            <ul className="review-stars">
                                <li>⭐</li>
                                <li>⭐</li>
                                <li>⭐</li>
                                <li>⭐</li>
                                <li>⭐</li>
                            </ul>
                            <p>Adorei minha bolsa personalizada! A qualidade é incrível e o atendimento foi super atencioso. Recomendo muito!</p>
                        </div>
                    </div>
                    <button>aft</button>
                </div>
            </section>
        </div>
    )
}