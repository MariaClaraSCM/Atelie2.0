import { useState } from "react";
import bolsa from "../../../assets/produtos/bolsa.svg";
import fav from "../../../assets/produtos/fav.svg";
import GaleriaProdutos from "./galeriaprodutos";
// import FiltroProduto from "./filtroprodutos";

export default function MainProdutos() {
  return (
    <>
      <main>
        {/* <FiltroProduto/> */}
        <GaleriaProdutos />
      </main>
    </>
  );
}
