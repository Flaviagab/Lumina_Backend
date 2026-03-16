import { Router } from "express";
import UsuarioController from "./controllers/usuarioController";
import CategoriaController from "./controllers/categoriaController";
import { body } from "express-validator";
import AutorController from "./controllers/autorController";
import upload from "./config/upload";

const router = Router();

const validarCadastro = [
    body("nome").notEmpty().withMessage("O nome é obrigatório"),
    body("email").isEmail().withMessage("Insira um email válido"),
    body("senha").isLength({ min: 6 }).withMessage("Senha deve ter ao menos 6 caracteres"),
    body("cpf").notEmpty().withMessage("O cpf é obrigatório")
]

router.get("/usuarios", UsuarioController.findAll);
router.post("/usuarios", validarCadastro, UsuarioController.create);
router.get("/usuarios/:id", UsuarioController.getById);
router.delete("/usuarios/:id", UsuarioController.remove);
router.put("/usuarios/:id", UsuarioController.update);

router.get("/categorias", CategoriaController.findAll);
router.post("/categorias", CategoriaController.create);
router.get("/categorias/:id", CategoriaController.getById);
router.delete("/categorias/:id", CategoriaController.remove);
router.put("/categorias/:id", CategoriaController.update);


router.get("/autores", AutorController.findAll);
router.post("/autores", upload.single("foto"), AutorController.create);
router.get("/autores/:id", AutorController.getById);
router.delete("/autores/:id", AutorController.remove);
router.put("/autores/:id", AutorController.update);



export default router;