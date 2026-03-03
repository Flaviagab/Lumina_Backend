import { Request, Response } from "express";
import Usuario from "../models/Usuario";

class UsuarioController{
    static async findAll(req: Request, res: Response){
        const usuario = await Usuario.findAll();
        res.send(usuario);
    }
}

export default UsuarioController;