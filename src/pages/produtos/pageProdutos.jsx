import HeaderGuest from "../header/headerguest";
import Footer from "../footer/footer";
import "./pageProdutos.css";
import FiltroProdutos from "./filtroProdutos.jsx";
import MainProdutos from "./mainProdutos";

export default function PageProdutos() {
  return (
    <>
      <HeaderGuest />

      <div className="flex">
        <FiltroProdutos />
        <MainProdutos />
      </div>

      <Footer />
    </>
  );
}
