import { useState } from "react";
import { cadastrarCategoria } from "../../services/api";

export default function CategoriaModal({ onClose }) {
  const [nome, setNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nome.trim() === "") {
      alert("Digite o nome da categoria!");
      return;
    }

    const resp = await cadastrarCategoria(nome);

    if (resp.ok && !resp.data.erro) {
      alert(resp.data.mensagem);
      onClose();
    } else {
      alert(resp.data.erro || "Erro ao cadastrar");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Adicionar Categoria</h2>

        <form onSubmit={handleSubmit}>
          <label>Nome da categoria:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <div style={styles.buttons}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "6px",
    width: "350px",
  },
  buttons: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },
};
