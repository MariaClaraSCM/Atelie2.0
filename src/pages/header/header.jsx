//import HeaderGuest from "./HeaderGuest";
import HeaderUser from "./HeaderUser";
import HeaderAdmin from "./HeaderAdmin";

export default function Header({ role }) {
  if (role === "admin") return <HeaderAdmin />;
  if (role === "user") return <HeaderUser />;
  return <HeaderGuest />;
}
