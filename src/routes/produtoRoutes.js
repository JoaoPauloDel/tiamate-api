const { buscar, criar, editar, deletar } = require("../controllers/produtoController");
const { rotaProtegida } = require("../middlewares");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: 'src/uploads/produtos/',
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        cb(null, `${timestamp}-${file.originalname}`);
    }
});
const upload = multer({ storage });
const router = require("express").Router();

router.get("/",
    /* #swagger.tags = ['Produtos'] */
    /* #swagger.summary = 'Lista os produtos' */
    /* #swagger.responses[200] = { description: 'Produtos retornados com sucesso.', schema: [{ id: 1, nome: 'Cafe', imagem: 'http://localhost:8000/uploads/produtos/cafe.jpg', categoria_id: 1, categorias: { id: 1, nome: 'Bebidas' } }] } */
    /* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
    buscar);

router.post("/:id", rotaProtegida, upload.single('imagem'),
    /* #swagger.tags = ['Produtos'] */
    /* #swagger.summary = 'Atualiza um produto' */
    /* #swagger.consumes = ['multipart/form-data'] */
    /* #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', format: 'int32' } */
    /* #swagger.parameters['nome'] = { in: 'formData', required: true, type: 'string', maxLength: 30 } */
    /* #swagger.parameters['categoria_id'] = { in: 'formData', required: true, type: 'integer', format: 'int32' } */
    /* #swagger.parameters['imagem'] = { in: 'formData', type: 'file' } */
    /* #swagger.responses[200] = { description: 'Falha ao atualizar registro.', schema: { mensagem: 'Falha ao atualizar registro' } } */
    /* #swagger.responses[201] = { description: 'Registro atualizado com sucesso.', schema: { mensagem: 'Registro atualizado com sucesso' } } */
    /* #swagger.responses[401] = { description: 'Token e obrigatorio ou Token invalido.', schema: { mensagem: 'Token invalido' } } */
    /* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
    editar);

router.post("/", rotaProtegida, upload.single('imagem'),
    /* #swagger.tags = ['Produtos'] */
    /* #swagger.summary = 'Cria um produto' */
    /* #swagger.consumes = ['multipart/form-data'] */
    /* #swagger.parameters['nome'] = { in: 'formData', required: true, type: 'string', maxLength: 30 } */
    /* #swagger.parameters['categoria_id'] = { in: 'formData', required: true, type: 'integer', format: 'int32' } */
    /* #swagger.parameters['imagem'] = { in: 'formData', type: 'file' } */
    /* #swagger.responses[200] = { description: 'Falha ao criar registro.', schema: { mensagem: 'Falha ao criar registro' } } */
    /* #swagger.responses[201] = { description: 'Registro criado com sucesso.', schema: { mensagem: 'Registro criado com sucesso' } } */
    /* #swagger.responses[401] = { description: 'Token e obrigatorio ou Token invalido.', schema: { mensagem: 'Token invalido' } } */
    /* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
    criar);

router.delete("/:id", rotaProtegida,
    /* #swagger.tags = ['Produtos'] */
    /* #swagger.summary = 'Exclui um produto' */
    /* #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', format: 'int32' } */
    /* #swagger.responses[200] = { description: 'Registro apagado com sucesso ou Registro ja foi apagado.', schema: { mensagem: 'Registro apagado com sucesso' } } */
    /* #swagger.responses[401] = { description: 'Token e obrigatorio ou Token invalido.', schema: { mensagem: 'Token invalido' } } */
    /* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
    deletar);

module.exports = router;
