import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/autenticacoes/login.jsx";
import Cadastro from "./pages/autenticacoes/cadastro.jsx";
import UserPage from "./pages/users/userpage.jsx";
import PageProdutos from "./pages/produtos/pageProdutos.jsx";
import VerProdutos from "./pages/users/produtosUser/produtos.jsx";
import ProdutoComprar from "./pages/produtos/produtocomprar.jsx";
import Carrinho from "./pages/users/carrinho/carrinho.jsx";
// ADM
import AdmDashboard from "./pages/admin/dashboard.jsx";
import AdmProdutos from "./pages/admin/produtos.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<UserPage />} />
      <Route path="/produtos" element={<PageProdutos />} /> 
      <Route path="/verprodutos" element={<VerProdutos />} />
      {/* Ver qual produtos fica kk */}
      <Route path="/comprar/:id" element={<ProdutoComprar />} />
      <Route path="/carrinho" element={<Carrinho />} />
      {/* Rotas para as paginas do ADM */}
      <Route path="/dashboard" element={<AdmDashboard />} />
      <Route path="/addproduto" element={<AdmProdutos />} />
    </Routes>
  </BrowserRouter>
);
