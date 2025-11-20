import React from "react";

export default function AdmConfiguracoes() {
    return (
        <div className="configuracoes">
            <div className="info-adm">
                <div className="layout">
                    <h3>Meu perfil</h3>
                    <div className="foto_upload">
                        <canvas> {/* tirar quando puxar uma imagem de fato */}</canvas>
                        <button><img width={"30px"} style={{color: "black"}} src="https://fonts.google.com/icons?selected=Material+Symbols+Outlined:add_a_photo:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=media&icon.size=24&icon.color=%23e3e3e3&icon.platform=web" alt="" />Editar foto</button>
                    </div>
                    <p>Nome de usuário aqui</p>
                    <small>cpf 000000000000</small>
                    <button>Sair</button>
                </div>
                <div className="layout-form">
                    <form action="" method="post" className="form-editar">
                        <h3>Informações</h3>
                        <div>
                            <label htmlFor="nome_completo">Nome completo:</label>
                            <input type="text" name="nome_completo" id="" deac />
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "4fr 1fr", gap: "10px"}}>
                            <div>
                                <label htmlFor="email">E-mail:</label>
                                <input type="email" name="email" id=""/>
                            </div>
                            <div>
                                <label htmlFor="">Data de nascimento</label>
                                <input type="date" name="data_nascimento" id=""/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="telefone">Telefone:</label>
                            <input type="tel" name="telefone" id=""/>
                        </div>
                        <input type="submit" value="Editar informações" />
                    </form>
                </div>
            </div>
        </div>
    );
}