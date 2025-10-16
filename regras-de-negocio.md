# infos Ateliê

### 📋 Regra de Negócio — Administrador (Costureira)

O **Administrador (Costureira)** acessa o sistema por meio de login para gerenciar os dados da aplicação.

### 🔹 Produtos e Categorias

- O administrador pode **criar**, **editar** e **excluir** produtos.
- Cada produto **deve obrigatoriamente pertencer a uma categoria**.
- O administrador pode **criar** ou **excluir** categorias.
- Uma categoria pode **não possuir nenhum produto** ou conter **um ou vários produtos** associados.
- Cada **produto** deve conter:
    - Nome
    - Preço
    - Descrição
    - Foto
    - Categoria
- Cada **categoria** deve conter:
    - Nome

### 🔹 Pedidos

- O administrador tem acesso a uma **tela de informações**, onde é exibido o **histórico de todos os pedidos**, pagos ou não.
- Os pedidos possuem **status**, que podem ser alterados pelo administrador.
- Os status possíveis são:
    - **Pendente** – pedido criado, aguardando pagamento
    - **Em andamento** – pagamento confirmado, produção iniciada
    - **Concluído** – produto finalizado e pronto para envio
    - **A caminho** – produto enviado ao cliente
    - **Entregue** – produto recebido pelo cliente

### 🔹 Relações

- Cada **pedido pertence a um cliente**.
- Um **cliente pode não ter nenhum pedido** ou ter **vários pedidos**.

### 🔹 Informações do Pedido

Cada pedido contém:

- Código identificador
- Nome do cliente
- Itens do pedido (podendo ser **sem personalização** — pronta entrega — ou **com personalização** — encomenda)
- Valor individual de cada item
- Valor total do pedido
- Data e hora da solicitação
- Método de pagamento

### 👩‍🧵 Regra de Negócio — Cliente (Usuário)

O **Usuário (Cliente)** precisa realizar um **cadastro** antes de acessar o sistema.

Não é possível efetuar login sem ter um cadastro previamente criado.

### 🔹 Cadastro e Login

- O **cadastro** solicita os seguintes dados obrigatórios:
    - Nome completo
    - CPF
    - Data de nascimento
    - Telefone
    - E-mail
    - Senha
    - Endereço completo
- O **login** é realizado utilizando **e-mail e senha**, que devem coincidir com os dados do cadastro.

### 🔹 Favoritos

- O usuário pode **favoritar** ou **remover dos favoritos** qualquer produto disponível.

### 🔹 Carrinho e Compras

- O usuário pode **adicionar** ou **remover** produtos do **carrinho de compras**.
- Os produtos podem ser:
    - **Pronta entrega:** podem ser comprados diretamente pelo botão “Comprar” ou pelo carrinho.
    - Encomenda (personalizados): ao clicar em “Comprar”, o sistema abre uma tela para preencher as informações do pedido, para que o cliente possa enviar as informações de personalização.
- Após o envio das informações, é **gerado um pedido** com:
    - Nome do produto
    - Nome da cliente
    - ID (código) do pedido
    - Cor
    - Personagem
    - Tamanho

### 🔹 Perfil do Usuário

O usuário possui uma área de **perfil**, onde pode:

- Alterar informações pessoais como:
    - Endereço completo
    - Telefone
    - Senha
    - E-mail (com confirmação)
    - Foto de perfil
- Os campos **nome** e **CPF** são **inalteráveis**.

### 🔹 Histórico de Pedidos

- No perfil, o usuário tem acesso ao **histórico completo de pedidos realizados**, exibido em ordem cronológica (do primeiro ao último).
- Cada pedido apresenta seu **status**, que pode ser:
    - **Pendente**
    - **Em andamento**
    - **Concluído**
    - **Cancelado**
