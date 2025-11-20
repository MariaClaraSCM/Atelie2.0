//NÃO ALTERE ESTE ARQUIVO, ELE ESTÁ PUXANDO OS DADOS DO XAMPP LOCALHOST
const API_BASE_URL = "http://localhost/api";

// Função para cadastrar usuário
export async function cadastrarUsuario(formData) {
  const url = `${API_BASE_URL}/cadastro.php`;

  // Copia os dados e remove itens que não vão para o backend
  const dataToSend = { ...formData };
  delete dataToSend.confirma_senha; 
  delete dataToSend.foto; 
  dataToSend.foto = null;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Erro de conexão com API:", error);
    return { ok: false, data: { erro: "Falha de conexão com o servidor" } };
  }
}


//EXEMPLOS DE FUNÇÕES PARA BUSCAR DADOS DA API
/*** A const API_URL está pegando a pasta do xampp que estamos usando para colocar os controllers, por isso API_URL + "nome do arquivo(Que foi feito para pegar e settar os dados)" ****/

/*export async function getUsuarios() {
  const response = await fetch(API_URL + "usuarios.php");
  return await response.json();
}

export async function getProdutos() {
  const response = await fetch(API_URL + "produtos.php");
  return await response.json();
}*/