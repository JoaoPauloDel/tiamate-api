const { buscar, criar, editar, deletar } = require("../controllers/interessadoController");
const { rotaProtegida } = require("../middlewares");

const router = require("express").Router();

router.get("/", rotaProtegida, buscar);
router.post("/", criar);
router.put("/:id", rotaProtegida, editar);
router.delete("/:id", rotaProtegida, deletar);

module.exports = router;
