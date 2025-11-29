import Header from "../header/header.jsx";
import Footer from "../footer/footer";
import "./pageProdutos.css";
// import FiltroProdutos from "./filtroProdutos.jsx"; 
// ^ 29.11 00:21 - filtrosProdutos tá dando erro e bloqueia a funcionalidade da página
import MainProdutos from "./mainProdutos";

export default function PageProdutos() {
  return (
    <>
       <Header/>

      <div className="flex">
        {/* <FiltroProdutos /> */}
        <MainProdutos />
      </div>

      <Footer />
    </>
  );
}
