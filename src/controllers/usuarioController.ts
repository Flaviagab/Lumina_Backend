import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

class UsuarioController {
    static async findAll(req: Request, res: Response) {
        try {
            const usuario = await Usuario.findAll();
            return res.send(usuario);

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(Number(id))
            if (!usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado" });
            }

            return res.status(200).json(usuario);

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async create(req: Request, res: Response) {

        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }
        try {
            const { nome, email, senha, cpf } = req.body;
            const senhaHash = await bcrypt.hash(senha, 10);

            const usuario = await Usuario.create({
                nome: nome,
                email: email,
                senha: senhaHash,
                cpf: cpf
            })
            return res.status(201).json(usuario);
        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async update(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }
        try {
            const { id } = req.params;
            const { nome, email, senha, cpf } = req.body;
            const usuario = await Usuario.findByPk(Number(id));

            if (!usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado" });

            }

            let senhaHash = usuario.senha;

            if (senha) {
                senhaHash = await bcrypt.hash(senha, 10);
            }
            await usuario.update({
                nome: nome,
                email: email,
                senha: senhaHash,
                cpf: cpf
            });
            return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }

    }

    static async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(Number(id));

            if (!usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado" })
            }

            await usuario.destroy();
            return res.status(200).json({ mensagem: "Usuário removido com sucesso" });
            
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }

    }

}

export default UsuarioController;