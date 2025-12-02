//NÃO ALTERE ESTE ARQUIVO, ELE ESTÁ PUXANDO OS DADOS DO XAMPP LOCALHOST
const API_BASE_URL = "http://localhost/api";

export async function verificarServidor() {
  const url = `${API_BASE_URL}/status_servidor.php`;

  try {
    const resp = await fetch(url);
    const json = await resp.json();
    return json;
  } catch (err) {
    console.error("Erro ao verificar servidor:", err);
    return { apache: false, mysql: false };
  }
}
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

async function retornarUsuarios() {
  //um select para exibir os usuários no modal
  try {
    const response = await fetch(
      `${API_BASE_URL}/pedidos-adm.php?buscar=usuario`
    ); //usado nesse conteto p mostrar usuarios no modal de criar pedido, mas pode ser usado em outras operações que precisem listar todos os users clientes
    const resultado = await response.json();
    if (resultado.success === false) {
      return false;
    } else if (resultado.error) {
      console.log("Debug: " + response.debug);
    } else {
      return resultado.usuarios;
    }
  } catch (error) {
    console.log("Erro encontrado: " + error.message);
  }
}

// ====================
// PEDIDOS
// ====================

async function inserirPedidoAdm(pedidoData) {
  //já recebe com o formato de objeto
  //formato:
  // {
  // 	"data": "2025-12-01",
  // 	"total": 35,
  // 	"metodo": "pix",
  // 	"status": "Pendente",
  // 	"user": 1,
  //   "item_pedido": [
  //     {
  //       "id_produto": 10,
  //       "quantidade": 2,
  //       "cor": "azul",
  //       "personagem": "Mario"
  //     },
  //     {
  //       "id_produto": 13,
  //       "quantidade": 1,
  //       "cor": "branco",
  //       "personagem": null
  //     },
  //     {
  //       "id_produto": 16,
  //       "quantidade": 3,
  //       "cor": "preto",
  //       "personagem": null
  //     }
  //   ]
  // }

  try {
    const response = await fetch(`${API_BASE_URL}/pedidos-adm.php`, {
      //`${API_BASE_URL}/clientes.php`
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedidoData), //convertendo so atributos p json
    });

    const resultado = await response.json(); //precisa converter dnv pq o fetch transforma em um outro tipo ao receber
    if (resultado.success === false) {
      return false;
    } else if (resultado.error) {
      console.log("Debug: " + resultado.debug);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("Algo deu errado: " + error.message);
  }
}

async function retornarPedidosAdm() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pedidos-adm.php?buscar=pedido`
    ); //só usando query params que da p pegar via get neste caso.
    const resultado = await response.json();
    if (resultado.success === false) {
      return false; //pq n achou pedidos feitos pelo adm. Aí o front vai tratar aonde seria p exibir.
    } else if (resultado.error) {
      console.log("Debug: " + resultado.debug);
      return false;
    } else {
      return resultado.pedidos;
    }
  } catch (error) {
    console.log("Algo deu errado: " + error.message);
  }
}

async function deletarPedido() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    const resultado = await response.json();
    if(resultado.success === false) {
      return false; //nenhum pedido ou item pedido encontrado! Ele exclui os dois de uma vez
    } else if(resultado.error) {
      console.log("Debug: " + resultado.debug);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("Algo deu errado: " + error.message); 
  }
}

async function atualizarPedidoAdm(novoPedidoData) {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json.stringify(novoPedidoData)
    }) 

    const resultado = await response.json();
    if(resultado.success === false) {
      return false;
    }
  } catch (error) {
    console.log("Algo deu errado: " + error.message);
  }

}



// CARRINHO DE COMPRAS
export async function adicionarAoCarrinho(idProduto, quantidade) {
  const url = `${API_BASE_URL}/carrinho.php`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_produto: idProduto, quantidade }),
    });

    const text = await res.text();
    // console.log("DEBUG RESPOSTA CRUA:", text);

    const json = JSON.parse(text);
    return json;
  } catch (err) {
    console.error("Erro ao adicionar ao carrinho:", err);
    return { erro: "Falha na conexão" };
  }
}

export async function exibirCarrinho() {
  const url = `${API_BASE_URL}/carrinho.php`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Erro ao buscar itens no carrinho: ", err);
    return [];
  }
}
