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

router.get("/", buscar);
router.post("/:id", rotaProtegida, upload.single('imagem'), editar);
router.post("/", rotaProtegida, upload.single('imagem'), criar);
router.delete("/:id", rotaProtegida, deletar);

module.exports = router;
