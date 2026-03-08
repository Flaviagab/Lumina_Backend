import { Router } from "express";
import UsuarioController from "./controllers/usuarioController";
import { body } from "express-validator";

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





export default router;