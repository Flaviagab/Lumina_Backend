import { Router } from "express";
import UsuarioController from "./controllers/usuarioController";

const router = Router();

router.get("/usuarios", UsuarioController.findAll);
router.post("/usuarios", UsuarioController.create);
router.get("/usuarios/:id", UsuarioController.getById);

export default router;