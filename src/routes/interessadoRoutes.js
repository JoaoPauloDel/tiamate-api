const { buscar, criar, editar, deletar } = require("../controllers/interessadoController");
const { rotaProtegida } = require("../middlewares");

const router = require("express").Router();

router.get("/", rotaProtegida,
	/* #swagger.tags = ['Interessados'] */
	/* #swagger.summary = 'Lista os interessados' */
	/* #swagger.responses[200] = { description: 'Interessados retornados com sucesso.', schema: [{ id: 1, nome: 'Maria Silva', email: 'maria@email.com', telefone: '11999999999', cidade: 'Sao Paulo', estado: 'SP', como: 'Instagram', data: '2026-01-01T00:00:00.000Z' }] } */
	/* #swagger.responses[401] = { description: 'Token e obrigatorio ou Token invalido.', schema: { mensagem: 'Token invalido' } } */
	/* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
	buscar);

router.post("/",
	/* #swagger.tags = ['Interessados'] */
	/* #swagger.summary = 'Cria um interessado' */
	/* #swagger.parameters['body'] = { in: 'body', required: true, schema: { $nome: 'Maria Silva', $email: 'maria@email.com', $telefone: '11999999999', $cidade: 'Sao Paulo', $estado: 'SP', $como: 'Instagram' } } */
	/* #swagger.responses[200] = { description: 'Falha ao criar registro.', schema: { mensagem: 'Falha ao criar registro' } } */
	/* #swagger.responses[201] = { description: 'Registro criado com sucesso.', schema: { mensagem: 'Registro criado com sucesso' } } */
	/* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
	criar);

router.put("/:id", rotaProtegida,
	/* #swagger.tags = ['Interessados'] */
	/* #swagger.summary = 'Atualiza um interessado' */
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', format: 'int32' } */
	/* #swagger.parameters['body'] = { in: 'body', required: true, schema: { nome: 'Maria Silva', email: 'maria@email.com', telefone: '11999999999', cidade: 'Sao Paulo', estado: 'SP', como: 'Instagram' } } */
	/* #swagger.responses[200] = { description: 'Falha ao atualizar registro.', schema: { mensagem: 'Falha ao atualizar registro' } } */
	/* #swagger.responses[201] = { description: 'Registro atualizado com sucesso.', schema: { mensagem: 'Registro atualizado com sucesso' } } */
	/* #swagger.responses[401] = { description: 'Token e obrigatorio ou Token invalido.', schema: { mensagem: 'Token invalido' } } */
	/* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
	editar);

router.delete("/:id", rotaProtegida,
	/* #swagger.tags = ['Interessados'] */
	/* #swagger.summary = 'Exclui um interessado' */
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', format: 'int32' } */
	/* #swagger.responses[200] = { description: 'Registro apagado com sucesso ou Registro ja foi apagado.', schema: { mensagem: 'Registro apagado com sucesso' } } */
	/* #swagger.responses[401] = { description: 'Token e obrigatorio ou Token invalido.', schema: { mensagem: 'Token invalido' } } */
	/* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
	deletar);

module.exports = router;
