const { buscar, criar, editar, deletar } = require("../controllers/unidadeController");
const { rotaProtegida } = require("../middlewares");

const router = require("express").Router();

router.get("/",
	/* #swagger.tags = ['Unidades'] */
	/* #swagger.summary = 'Lista as unidades' */
	/* #swagger.responses[200] = { description: 'Unidades retornadas com sucesso.', schema: [{ id: 1, nome: 'Unidade Central', endereco: 'Rua A', horario: '08:00 - 18:00', telefone: '11999999999' }] } */
	/* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
	buscar);

router.post("/", rotaProtegida,
	/* #swagger.tags = ['Unidades'] */
	/* #swagger.summary = 'Cria uma unidade' */
	/* #swagger.parameters['body'] = { in: 'body', required: true, schema: { $nome: 'Unidade Central', $endereco: 'Rua A', $horario: '08:00 - 18:00', $telefone: '11999999999' } } */
	/* #swagger.responses[200] = { description: 'Falha ao criar registro.', schema: { mensagem: 'Falha ao criar registro' } } */
	/* #swagger.responses[201] = { description: 'Registro criado com sucesso.', schema: { mensagem: 'Registro criado com sucesso' } } */
	/* #swagger.responses[401] = { description: 'Token e obrigatorio ou Token invalido.', schema: { mensagem: 'Token invalido' } } */
	/* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
	criar);

router.put("/:id", rotaProtegida,
	/* #swagger.tags = ['Unidades'] */
	/* #swagger.summary = 'Atualiza uma unidade' */
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', format: 'int32' } */
	/* #swagger.parameters['body'] = { in: 'body', required: true, schema: { nome: 'Unidade Central', endereco: 'Rua A', horario: '08:00 - 18:00', telefone: '11999999999' } } */
	/* #swagger.responses[200] = { description: 'Falha ao atualizar registro.', schema: { mensagem: 'Falha ao atualizar registro' } } */
	/* #swagger.responses[201] = { description: 'Registro atualizado com sucesso.', schema: { mensagem: 'Registro atualizado com sucesso' } } */
	/* #swagger.responses[401] = { description: 'Token e obrigatorio ou Token invalido.', schema: { mensagem: 'Token invalido' } } */
	/* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
	editar);

router.delete("/:id", rotaProtegida,
	/* #swagger.tags = ['Unidades'] */
	/* #swagger.summary = 'Exclui uma unidade' */
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', format: 'int32' } */
	/* #swagger.responses[200] = { description: 'Registro apagado com sucesso ou Registro ja foi apagado.', schema: { mensagem: 'Registro apagado com sucesso' } } */
	/* #swagger.responses[401] = { description: 'Token e obrigatorio ou Token invalido.', schema: { mensagem: 'Token invalido' } } */
	/* #swagger.responses[500] = { description: 'Erro interno do servidor.', schema: { mensagem: 'Error: mensagem do erro' } } */
	deletar);

module.exports = router;
