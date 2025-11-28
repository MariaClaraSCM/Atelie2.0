import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadFoto from "../../assets/adm/uploaFotos.svg";
import "./dashboard.css";
import { cadastrarProduto, listarCategorias } from "../../services/api.js";

export default function AdmProdutos() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "", // <- aqui virá o id_categoria
    tamanho: "",
    preco: "",
    tipo: "",
  });

  const [fotos, setFotos] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Carregar categorias ao abrir a página
  useEffect(() => {
    async function carregar() {
      const result = await listarCategorias();
      if (result.ok) setCategorias(result.data.categorias);
    }
    carregar();
  }, []);

  // Atualizar inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fotos
  const handleAddFotos = (e) => {
    const arquivos = Array.from(e.target.files);

    if (fotos.length + arquivos.length > 5) {
      alert("Máximo 5 fotos!");
      return;
    }

    setFotos((prev) => [...prev, ...arquivos]);
    setPreviews((prev) => [
      ...prev,
      ...arquivos.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleRemoveFoto = (index) => {
    setFotos(fotos.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  // Enviar produto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoria) {
      alert("Selecione uma categoria!");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    fotos.forEach((foto) => data.append("fotos[]", foto));

    const resultado = await cadastrarProduto(data);

    if (resultado.ok) {
      alert("Produto cadastrado com sucesso!");
      navigate("/dashboard");
    } else {
      alert("Erro: " + resultado.data.erro);
    }
  };

  return (
    <main className="addProdutos">
      <h2 className="ttlP">Crie um novo produto</h2>

      <form onSubmit={handleSubmit} className="formProdutos">
        <section className="infoProdutos">
          <div className="divFlexdirection">
            <label>Nome do produto:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="divFlexdirection">
            <label>Descrição:</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="ajusteInputs1">
            {/* SELECT COM CATEGORIAS DO BANCO */}
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a categoria</option>

              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nm_categoria}
                </option>
              ))}
            </select>

            <div>
              <label>Tamanho:</label>
              <input
                type="text"
                name="tamanho"
                value={formData.tamanho}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Preço:</label>
              <input
                type="text"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
              />
            </div>
          </div>
            <div className="tipos">
              <label>Tipo:</label>
              <input
                type="radio"
                name="tipo"
                value="Pronta entrega"
                onChange={handleChange}
              />{" "}
              Pronta entrega
              <input
                type="radio"
                name="tipo"
                value="Encomenda"
                onChange={handleChange}
              />{" "}
              Encomenda
            </div>
        </section>

        <section className="fotoProduto">
          <h2>Imagens do produto</h2>

          <label className="upload">
            <img src={uploadFoto} alt="" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAddFotos}
            />
          </label>

          <div className="ajusteImagemUpload">
            {previews.map((src, index) => (
              <div key={index} className="imagemUpload">
                <img src={src} alt="Prévia" />
                <button type="button" onClick={() => handleRemoveFoto(index)}>
                  X
                </button>
              </div>
            ))}
          </div>

          <div className="btns">
            <input type="submit" value="Criar produto" />
          </div>
        </section>
      </form>
    </main>
  );
}
