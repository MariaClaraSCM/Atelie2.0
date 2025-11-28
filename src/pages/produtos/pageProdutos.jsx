import Header from "../header/header.jsx";
import Footer from "../footer/footer";
import "./pageProdutos.css";
import FiltroProdutos from "./filtroProdutos.jsx";
import MainProdutos from "./mainProdutos";

export default function PageProdutos() {
  return (
    <>
       <Header/>

      <div className="flex">
        <FiltroProdutos />
        <MainProdutos />
      </div>

      <Footer />
    </>
  );
}
