import React from "react"

export default function AdmConfiguracoes() {
    return (
        <div className="configuracoes">
            <div className="info-adm">
                <div className="layout">
                    <h3>Meu perfil</h3>
                    <canvas> {/* tirar quando puxar uma imagem de fato */}</canvas>
                    <p>Nome de usuário aqui</p>
                    <small>cpf 000000000000</small>
                    <button>Sair</button>
                </div>
                <div className="layout-form">
                    <form action="" method="post" className="form-editar">
                        <h3>Informações</h3>
                        <label htmlFor="nome_completo">Nome completo:</label>
                        <input type="text" name="nome_completo" id="" deac />
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" name="email" id=""/>
                        <label htmlFor="">Data de nascimento</label>
                        <input type="date" name="data_nascimento" id=""/>
                        <label htmlFor="telefone">Telefone:</label>
                        <input type="tel" name="telefone" id=""/>
                        <input type="submit" value="Editar informações" />
                    </form>
                </div>
            </div>
        </div>
    );
}