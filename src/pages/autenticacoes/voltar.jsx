import { useNavigate } from "react-router-dom";

export default function Voltar() {
  const navigate = useNavigate();

  const voltar = () => {
    navigate(-1); // -1 significa "voltar uma página"
  };
  return <></>;
}
