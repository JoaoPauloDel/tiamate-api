const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const categoriaRoutes = require("./src/routes/categoriaRoutes");
const unidadeRoutes = require("./src/routes/unidadeRoutes");
const interessadoRoutes = require("./src/routes/interessadoRoutes");
const depoimentoRoutes = require("./src/routes/depoimentoRoutes");
const produtoRoutes = require("./src/routes/produtoRoutes");
const { login } = require("./src/controllers/usuarioController");
const { rotaProtegida } = require("./src/middlewares");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger-output.json');

const app = express();

// middlewares
app.use(cors()); // libera requisições vindas de outros dominios
app.use(express.json()); // transforma o corpo da requisição de json para js


app.get("/", (req, res) => {
    res.redirect("/docs")
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/login", login);

app.use("/usuarios", rotaProtegida, usuarioRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/unidades", unidadeRoutes);
app.use("/interessados", interessadoRoutes);
app.use("/depoimentos", depoimentoRoutes);
app.use("/produtos", produtoRoutes);
app.use("/uploads", express.static("./src/uploads"));


// quando a rota não for encontrada cai aqui
app.use((req, res) => {
    res.status(404).json({ 
        mensagem: "Rota não encontrada"
    });
});

app.listen(8000, () => {
    console.log("Servidor on: http://localhost:8000");
});