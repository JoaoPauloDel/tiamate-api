const { buscar, criar, editar, deletar } = require("../controllers/unidadeController");
const { rotaProtegida } = require("../middlewares");

const router = require("express").Router();

router.get("/", buscar);
router.post("/", rotaProtegida, criar);
router.put("/:id", rotaProtegida, editar);
router.delete("/:id", rotaProtegida, deletar);

module.exports = router;
