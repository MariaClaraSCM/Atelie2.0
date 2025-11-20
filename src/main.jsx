import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/autenticacoes/login.jsx";
import Cadastro from "./pages/autenticacoes/cadastro.jsx";
import UserPage from "./pages/users/userpage.jsx";
// ADM
import AdmDashboard from "./pages/admin/dashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<UserPage />} />
      <Route path="/dashboard" element={<AdmDashboard/>} />
    </Routes>
  </BrowserRouter>
);
