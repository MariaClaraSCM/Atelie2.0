//NÃO ALTERE ESTE ARQUIVO, ELE ESTÁ PUXANDO OS DADOS DO XAMPP LOCALHOST
const API_BASE_URL = "http://localhost/api";

// ====================
// CADASTRO USUÁRIO
// ====================
export async function cadastrarUsuario(formData) {
  const url = `${API_BASE_URL}/cadastro.php`;

  const dataToSend = { ...formData };
  delete dataToSend.confirma_senha;
  delete dataToSend.foto;
  dataToSend.foto = null;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Erro de conexão com API:", error);
    return { ok: false, data: { erro: "Falha de conexão com o servidor" } };
  }
}

// ====================
// LOGIN / LOGOUT / USUÁRIO LOGADO
// ====================
const API_USUARIOS = `${API_BASE_URL}/usuarios.php`;

// login
export async function login(email, senha) {
  try {
    const res = await fetch(API_USUARIOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
      credentials: "include", // envia cookies de sessão
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro no login:", err);
    return { sucesso: false, erro: err.message };
  }
}

// logout
export async function logout() {
  try {
    const res = await fetch(API_USUARIOS, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro no logout:", err);
    return { sucesso: false, erro: err.message };
  }
}

// buscar usuário logado
export async function getUsuarioLogado() {
  try {
    const res = await fetch(API_USUARIOS, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar usuário logado:", err);
    return { sucesso: false, erro: err.message };
  }
}

// ====================
// CATEGORIAS
// ====================
// lista
export async function listarCategorias() {
  const url = `${API_BASE_URL}/categorias.php`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: [] };
  }
}

//cadastra
export async function cadastrarCategoria(nome) {
  const url = `${API_BASE_URL}/categorias.php`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nm_categoria: nome }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { erro: "Falha na conexão" } };
  }
}

//edita
export async function editarCategoria(id, nome) {
  const url = `${API_BASE_URL}/categorias.php`;
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_categoria: id, nm_categoria: nome }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { erro: "Falha na conexão" } };
  }
}

//exclui
export async function excluirCategoria(id) {
  const url = `${API_BASE_URL}/categorias.php?id=${id}`;
  try {
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { erro: "Falha na conexão" } };
  }
}

// ====================
// PRODUTOS
// ====================
export async function cadastrarProduto(formData) {
  const url = `${API_BASE_URL}/adm-produtos.php`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData, // NÃO colocar headers!
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    return { ok: false, data: { erro: "Falha ao conectar ao servidor" } };
  }
}

export async function listarProdutos() {
  const url = `${API_BASE_URL}/adm-produtos.php`;
  try {
    const req = await fetch(url);
    const json = await req.json();
    return json;
  } catch (err) {
    return { ok: false, erro: "Erro ao conectar com API" };
  }
}

// ====================
// CLIENTES
// ====================
export async function carregarClientes() {
  const resp = await fetch(`${API_BASE_URL}/clientes.php`);
  const dados = await resp.json();
  return dados;
}

export async function excluirCliente(id) {
  const resp = await fetch(`${API_BASE_URL}/clientes.php`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_usuario: id }),
  });
  const resultado = await resp.json();
  return resultado;
}

// CARRINHO DE COMPRAS
// adicionar item ao carrinho
export async function adicionarAoCarrinho(id_produto, quantidade = 1) {
  try {
    // const resp = await getUsuarioLogado();

    // if (!resp.sucesso) {
    //   return { ok: false, data: { erro: "Usuário não está logado" } };
    // }

    const res = await fetch(`${API_BASE_URL}/carrinho.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id_produto, quantidade }),
    });

    const data = await res.json();
    return { ok: res.ok, data };

  } catch (err) {
    console.error("Erro ao adicionar ao carrinho:", err);
    return { ok: false, data: { erro: "Falha ao conectar ao servidor" } };
  }
}


// listar produtos do carrinho
export async function listarCarrinho() {
  try {
    const res = await fetch(`${API_BASE_URL}/carrinho.php`, {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json();
    return { ok: res.ok, data };

  } catch (err) {
    console.error("Erro ao listar carrinho:", err);
    return { ok: false, data: [] };
  }
}

// atualizar quantidade
export async function atualizarQuantidadeCarrinho(id_produto, quantidade) {
  try {
    const res = await fetch(`${API_BASE_URL}/carrinho.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id_produto, quantidade })
    });

    const data = await res.json();
    return { ok: res.ok, data };

  } catch (err) {
    console.error("Erro ao atualizar quantidade:", err);
    return { ok: false, data: { erro: "Falha ao conectar" } };
  }
}

// remover item
export async function removerDoCarrinho(id_produto) {
  try {
    const res = await fetch(`${API_BASE_URL}/carrinho.php?id=${id_produto}`, {
      method: "DELETE",
      credentials: "include"
    });

    const data = await res.json();
    return { ok: res.ok, data };

  } catch (err) {
    console.error("Erro ao remover item:", err);
    return { ok: false, data: { erro: "Falha ao conectar" } };
  }
}

async function verCarrinho(id_produto) {
  // adiciona um produto
  await adicionarAoCarrinho(id_produto, 1);

  // lista o carrinho
  const resultado = await listarCarrinho();
  console.log("Carrinho:", resultado);
}

verCarrinho();