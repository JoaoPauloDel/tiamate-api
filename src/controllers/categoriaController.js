const { PRISMACLIENT } = require("../services");

async function buscar(req, res) {
    try {
        const linhas = await PRISMACLIENT.categorias.findMany({
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
        const linha = await PRISMACLIENT.categorias.create({
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
        const linha = await PRISMACLIENT.categorias.update({
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

        const existe = await PRISMACLIENT.categorias.count({
            where: {
                id: Number(req.params.id)
            }
        })

        if(existe > 0){
            await PRISMACLIENT.categorias["delete"]({
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