const { PRISMACLIENT } = require("../services");


async function buscar(req, res) {
    try {
        const linhas = await PRISMACLIENT.depoimentos.findMany({
            orderBy: {
                id: "asc"
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
        let arquivo = req.file;

        const dadosCriacao = {
            nome: dados.nome,
            texto: dados.texto,
            estrelas: Number(dados.estrelas)
        };

        if (arquivo) {
            dadosCriacao.imagem = `${req.protocol}://${req.headers.host}/uploads/depoimentos/${arquivo.filename}`;
        }

        const linha = await PRISMACLIENT.depoimentos.create({
            data: dadosCriacao
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
        let arquivo = req.file;

        const dadosAtualizacao = {
            nome: dados.nome,
            texto: dados.texto,
            estrelas: Number(dados.estrelas)
        };

        if (arquivo) {
            dadosAtualizacao.imagem = `${req.protocol}://${req.headers.host}/uploads/depoimentos/${arquivo.filename}`;
        }

        const linha = await PRISMACLIENT.depoimentos.update({
            where: {
                id: Number(req.params.id)
            },
            data: dadosAtualizacao
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

        const existe = await PRISMACLIENT.depoimentos.count({
            where: {
                id: Number(req.params.id)
            }
        })

        if(existe > 0){
            await PRISMACLIENT.depoimentos["delete"]({
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

module.exports = {
    buscar,
    criar,
    editar,
    deletar
}