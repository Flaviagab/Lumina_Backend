import { Request, Response } from "express";
import Usuario from "../models/Usuario";

class UsuarioController {
    static async findAll(req: Request, res: Response) {
        const usuario = await Usuario.findAll();
        res.send(usuario);
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(Number(id))
        res.send(usuario);
    }

    static async create(req: Request, res: Response) {
        const { nome, email, senha, cpf } = req.body;

        const usuario = await Usuario.create({
            nome: nome,
            email: email,
            senha: senha,
            cpf: cpf
        })
        res.send(usuario);
    }
}

export default UsuarioController;