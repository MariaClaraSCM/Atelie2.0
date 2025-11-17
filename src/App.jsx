import { useState, useEffect } from "react";
import Home from "./pages/home.jsx";
import "./App.css";
import HeaderGuest from "./pages/header/headerguest.jsx";
import Footer from "./pages/footer/footer.jsx";

//FUNÇÃO PARA VERIFICAR A CONEXÃO COM A API LOCALHOST
function App() {
  useEffect(() => {
    fetch("http://localhost/api/usuarios.php")
      .then((r) => r.json())
      .then((d) => console.log(d))
      .catch((err) => console.error(err));
  }, []);

return (
  <>
    <HeaderGuest />
    <Home />
    <Footer />
  </>
);
}

export default App;
