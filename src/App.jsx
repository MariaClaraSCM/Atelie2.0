import { useState, useEffect, use } from "react";
import Home from "./pages/home.jsx";
import "./App.css";
import Header from "./pages/header/header.jsx";
import Footer from "./pages/footer/footer.jsx";
import { verificarServidor } from "./services/api.js";

//FUNÇÃO PARA VERIFICAR A CONEXÃO COM A API LOCALHOST
function App() {
  // useEffect(() => {
  //   fetch("http://localhost/api/usuarios.php")
  //     .then((r) => r.json())
  //     .then((d) => console.log(d))
  //     .catch((err) => console.error(err));
  // }, []);

  // Estado para armazenar o status dos servidores apache e mysql
  const [status, setStatus] = useState(null);
  useEffect(() => {
    verificarServidor()
    .then((r)=> r.json())
    .then((dados) => {
      setStatus(dados);

      if (dados.mysql === true) {
        return fetch("http://localhost/api/usuarios.php");
      } else {
        throw new Error("MySQL fora do ar");
      }
    })
    .then((r) => r.json())
      .then((usuarios) => console.log(usuarios))
      .catch((err) => {
        console.error("Erro detectado:", err);
        setStatus({ apache: false, mysql: false });
    });
  }, []);

return (
  <>
    <Header />
      {status === null && console.log("Verificando servidor MySQL e Apache")}
      
      {status && status.mysql === false && (
        console.log("Erro na conexão com o MySQL, servidor offline.")
      )}

      {status && status.apache === false && (
        console.log("Erro na conexão com o Apache, servidor offline.")
      )}

      {status?.apache && status?.mysql && (console.log("Servidor rodando"))}
      <Home />
    <Footer />
  </>
);
}

export default App;