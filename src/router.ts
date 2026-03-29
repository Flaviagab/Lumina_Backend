import { Router } from "express";
import UsuarioController from "./controllers/usuarioController";
import CategoriaController from "./controllers/categoriaController";
import { body } from "express-validator";
import AutorController from "./controllers/autorController";
import { AutenticarToken } from "./middlewares/auth";
import upload from "./config/upload";
import LivroController from "./controllers/livroController";

const router = Router();

const validarCadastro = [
    body("nome").notEmpty().withMessage("O nome é obrigatório"),
    body("email").isEmail().withMessage("Insira um email válido"),
    body("senha").isLength({ min: 6 }).withMessage("Senha deve ter ao menos 6 caracteres"),
    body("cpf").notEmpty().withMessage("O cpf é obrigatório")
]

router.get("/usuarios", AutenticarToken, UsuarioController.findAll);
router.post("/usuarios", validarCadastro, UsuarioController.create);
router.get("/usuarios/:id", UsuarioController.getById);
router.delete("/usuarios/:id", AutenticarToken, UsuarioController.remove);
router.put("/usuarios/:id", AutenticarToken, UsuarioController.update);
router.post("/entrar", UsuarioController.login);

router.get("/categorias", CategoriaController.findAll);
router.post("/categorias", AutenticarToken, CategoriaController.create);
router.get("/categorias/:id", CategoriaController.getById);
router.delete("/categorias/:id", AutenticarToken, CategoriaController.remove);
router.put("/categorias/:id", AutenticarToken, CategoriaController.update);


router.get("/autores", AutorController.findAll);
router.post("/autores", upload.single("foto"), AutenticarToken, AutorController.create);
router.get("/autores/:id", AutorController.getById);
router.delete("/autores/:id", AutenticarToken, AutorController.remove);
router.put("/autores/:id", AutenticarToken, AutorController.update);


router.get("/livros", LivroController.findAll);
router.post("/livros",upload.fields([{ name: "capa_imagem", maxCount: 1 }, { name: "arquivo_pdf", maxCount: 1 }]), AutenticarToken, LivroController.create);
router.get("/livros/:id", LivroController.getById);
router.delete("/livros/:id", AutenticarToken, LivroController.remove);
router.put("/livros/:id", AutenticarToken, LivroController.update);





export default router;