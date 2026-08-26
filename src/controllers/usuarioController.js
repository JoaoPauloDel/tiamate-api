const { PRISMACLIENT } = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function buscar(req, res) {
    try {
        const linhas = await PRISMACLIENT.usuarios.findMany({
            orderBy: {
                id: "asc"
            },
            omit:{
                senha: true
            }
        });
        res.status(200).json(linhas);
    } catch (error) {
        res.status(500).json({
            mensagem: `Error: ${error.message}`
        });
    }
}

async function criar(req, res) {
    try {
        let dados = req.body;
        dados.senha = await bcrypt.hash(dados.senha, 10);

        const emailExiste = await PRISMACLIENT.usuarios.count({
            where: {
                email: dados.email
            }
        });

        if (emailExiste > 0) {
            res.status(200).json({
                mensagem: "Email já cadastrado"
            });
            return;
        }

        const linha = await PRISMACLIENT.usuarios.create({
            data: dados
        });

        if (linha.id) {
            res.status(201).json({
                mensagem: "Registro criado com sucesso"
            });
        } else {
            res.status(200).json({
                mensagem: "Falha ao criar registro"
            });
        }

    } catch (error) {
        res.status(500).json({
            mensagem: `Error: ${error.message}`
        });
    }
}

async function editar(req, res) {
    try {
        let dados = req.body;
        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 10);
        }

        const linha = await PRISMACLIENT.usuarios.update({
            data: dados,
            where: {
                id: Number(req.params.id)
            }
        });

        if (linha.id) {
            res.status(201).json({
                mensagem: "Registro atualizado com sucesso"
            });
        } else {
            res.status(200).json({
                mensagem: "Falha ao atualizar registro"
            });
        }

    } catch (error) {
        res.status(500).json({
            mensagem: `Error: ${error.message}`
        });
    }
}

async function deletar(req, res) {
    try {

        const existe = await PRISMACLIENT.usuarios.count({
            where: {
                id: Number(req.params.id)
            }
        })

        if(existe > 0){
            await PRISMACLIENT.usuarios["delete"]({
                where: {
                    id: Number(req.params.id)
                }
            });
    
            res.status(200).json({
                mensagem: "Registro apagado com sucesso"
            });
        }else{
            res.status(200).json({
                mensagem: "Registro já foi apagado"
            });
        }


    } catch (error) {
        res.status(500).json({
            mensagem: `Error: ${error.message}`
        });
    }
}

async function login(req, res) {
    try {
        const usuario = await PRISMACLIENT.usuarios.findFirst({
            where: {
                email: req.body.email
            }
        });

        if (!usuario) {
            res.json({
                mensagem: "Email ou senha incorretos"
            });
        }

        let senhaConfere = await bcrypt.compare(req.body.senha, usuario.senha);

        if (!senhaConfere) {
            res.json({
                mensagem: "Email ou senha incorretos"
            });
        }

        let token = await jwt.sign({id: usuario.id}, process.env.SEGREDO, { expiresIn: "1h" });

        res.json({
            mensagem: "Usuário autenticado",
            token
        });

    } catch (error) {
        res.status(500).json({
            mensagem: `Error: ${error.message}`
        });
    }
}


module.exports = {
    buscar,
    criar,
    editar,
    deletar,
    login
}