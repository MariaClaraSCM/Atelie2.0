<<<<<<< HEAD
# 🧵 Ateliê Vó Egina — Sistema Web

Aplicação web para gerenciamento do Ateliê Vó Egina, utilizando uma stack moderna com **React** no front-end e **PHP** simples no back-end, rodando via **XAMPP**.

---

## 🚀 Tecnologias Utilizadas

- **Front-end:** React + Vite
- **Back-end:** PHP puro
- **Servidor Local:** XAMPP (Apache + MySQL)

---

## 📌 IMPORTANTE

No GitHub, **só envie**:
- A pasta `src`
- O back-end: `xampp-backend`
- Arquivos de configuração (ex: `package.json`, `vite.config.js`, `README.md`)

**Não envie** a pasta `node_modules`!

---

## 🛠️ Pré-requisitos

Antes de rodar o projeto, instale:

- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/)

O Vite é configurado automaticamente pelo projeto.

---

## 📦 Instalação das Dependências

Após clonar o repositório:

```bash
npm install
npm install react-router-dom
```

---

## ▶️ Iniciando o Projeto

### Front-End (React + Vite)

```bash
npm run dev
```
Acesse: [http://localhost:5173/](http://localhost:5173/)

---

### Back-End (PHP via XAMPP)

1. Abra o **XAMPP Control Panel**.
2. Inicie **Apache** e **MySQL**.
3. Copie a pasta `xampp-backend` para:

   ```
   C:\xampp\htdocs\api\
   ```

4. Acesse pelo navegador:

   ```
   http://localhost/api/
   ```

- Exemplos de rotas:
  - `http://localhost/api/login.php`
  - `http://localhost/api/usuarios.php`

---

## 🔗 Integração React → PHP (API)

No front-end, o arquivo de integração está em: `src/service/api.js`

```js
export const API_URL = "http://localhost/api/";

// Exemplo de uso:
fetch(API_URL + "usuarios.php")
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 🗂️ Estrutura do Front-End

```
src/
 ├── assets/         # imagens e estilos
 ├── components/     # componentes reutilizáveis
 ├── pages/          # páginas da aplicação
 ├── services
 ├        ├── api/            # integração com o back-end (api.js)
 ├── App.jsx         # rotas e layout geral
 ├── main.jsx        # inicialização do React
 └── index.css       # estilos globais
```

---

## 🏗️ Build para Produção

Para gerar arquivos finais do front-end:

```bash
npm run build
```

Os arquivos serão gerados na pasta:

```
dist/
```

---

## 🤝 Contribuições

Pull Requests e Issues são **bem-vindos**!  
Sinta-se à vontade para contribuir com melhorias.

---

## 📜 Licença

Projeto de uso **educacional e pessoal**.

---

## ✨ Desenvolvido por

**[Bianca Agante Tiene](https://github.com/biancagante)**
--
**[Guilherme Saltão](https://github.com/GuiFS0703)**
--
**[Maria Clara Magalhães](https://github.com/MariaClaraSCM)**
--
**[Maria Vitória Lopes](https://github.com/MariaVitoriaLopes/MariaVitoriaLopes)**
--
**Milena takahashi**
=======