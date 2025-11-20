import "./dashboard.css";

export default function AdmProdutos() {
  return (
    <main className="addProdutos">
      <form action="" method="POST" className="addProdutos">
        <section className="infoProdutos">
          <h2 className="ttlP">Crie um novo produto</h2>
          <h5 className="subP">
            Adicione um novo produto a sua pagina de compras para que os usuario
            possam ver e pedir!
          </h5>

          <div className="ajusteLabelP">
            <label>Nome do produto:</label>
            <input type="text" />
          </div>

          <div className="ajusteLabelP">
            <label>Descrição: </label>
            <textarea></textarea>
          </div>

          <div className="ajusteInputs">
            <select name="" id="">
              <option value="">Escolha uma categoria</option>
              <option value="">Exemplo para colocar categorias</option>
            </select>

            <div>
              <label>Tamanho:</label>
              <input type="number" placeholder="30" />
            </div>

            <div>
              <label>Preço:</label>
              <input type="number" placeholder="Ex: 00.00" />
            </div>

            <div>
              <label>Tipo:</label>
              <input type="radio" name="tipo" value="pronta_entrega" /> Pronta
              entrega
              <input type="radio" name="tipo" value="Encomenda" /> Encomenda
            </div>
          </div>
        </section>

        <section className="fotoProduto">
          <h2>imagens do produto</h2>

          <input type="file" name="" id="" />

          <div className="ajusteImagemUpload">
            <div className="imagemUpload">A imahem tem que aparecer aqui</div>
            <div className="imagemUpload">A imahem tem que aparecer aqui</div>
          </div>

          <input type="submit" value="Criar produto" />

          <button type="button">Prévia</button>
          <button type="button">X cancelar</button>
        </section>
      </form>
    </main>
  );
}
