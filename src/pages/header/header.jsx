import { useEffect, useState } from "react";
import HeaderGuest from "./headerguest";
import HeaderUser from "./headeruser";
import HeaderAdmin from "./headeradm";
import { getUsuarioLogado } from "../../services/api";

export default function Header() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function buscar() {
      const res = await getUsuarioLogado();
      if (res.sucesso) setRole(res.usuario.tipo);
      else setRole("guest");
    }
    buscar();
  }, []);

  if (!role) return null;
  if (role === "admin") return <HeaderAdmin />;
  if (role === "user") return <HeaderUser />;
  return <HeaderGuest />;
}
