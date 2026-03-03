import express, { Router } from "express";
import UsuarioController from "./controllers/usuarioController";

const app = express();
app.use(express.json());

const router = Router();

router.get('/usuario', UsuarioController.findAll);

export default app;