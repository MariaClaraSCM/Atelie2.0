import Header from "../../header/header.jsx";
import Footer from "../../footer/footer.jsx";
import MainProdutos from "./mainprodutos.jsx";
import "./produtos.css"
import FiltroProduto from "./filtroprodutos.jsx";

export default function VerProdutos(){
    return(
        <>
            <Header/>
            {/* TENHO QUE ARRUMAR O CSS */}
            {/* <FiltroProduto/> */}
            <MainProdutos/>
            <Footer/>
        </>
    )
}