import React from "react";
import "./modal-pedido-adm.css";
import { useEffect, useState } from "react";

const modal_pedido_adm = ({ isOpen }) => {
  const [modalAberto, setModalAberto] = useState(isOpen);

    useEffect(()=> {

    }, []) //executa na primeira montagem do componente. Vou usar esse para fazer os selects necessários pro adm selecionar o user e os produtos do pedido.

  useEffect(() => {
    setModalAberto(isOpen);
  }, [isOpen]); //esse isOpen define se o modal deve abrir e fechar e é passado como params pelo arquivo do dashboard
  // Esse effect reage quando ocorre uma mudança nesse params

  const fecharModal = () => {
    setModalAberto(false);
  };

  if (!modalAberto) return null;

  return (
    <div className="modal-pedido" onClick={fecharModal}>
      <h2>Novo pedido</h2>
      <div className="usuarios">
        <h3>Usuarios</h3>
      </div>
      <div className="produtos">
        <h3>Produtos</h3>
      </div>
    </div>
  );
};

export default modal_pedido_adm;
