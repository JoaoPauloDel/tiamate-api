const { buscar, criar, editar, deletar } = require("../controllers/depoimentoController");
const { rotaProtegida } = require("../middlewares");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: 'src/uploads/depoimentos/',
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        cb(null, `${timestamp}-${file.originalname}`);
    }
});
const upload = multer({ storage });
const router = require("express").Router();

router.get("/", buscar);
router.post("/", rotaProtegida, upload.single("imagem"), criar);
router.put("/:id", rotaProtegida, editar);
router.delete("/:id", rotaProtegida, deletar);

module.exports = router;
