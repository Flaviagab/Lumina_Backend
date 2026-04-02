import { Request, Response } from "express";
import Livro from "../models/Livro";
import { validationResult } from "express-validator";

class LivroController {

    static async findAll(req: Request, res: Response) {

        try {
            const { categoria } = req.query;

            const where: any = {};

            if (categoria) {
                where.id_categoria = Number(categoria);
            }

            const livro = await Livro.findAll({
                where,
                include: [
                    { association: "autor" },
                    { association: "categoria" }
                ]
            });

            return res.send(livro);

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const livro = await Livro.findByPk(Number(id), {
                include: [
                    { association: "autor" },
                    { association: "categoria" }
                ]
            });
            if (!livro) {
                return res.status(404).json({ mensagem: "Livro não encontrado" });
            }

            return res.status(200).json(livro);

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async create(req: Request, res: Response) {
        try {

            const { id_autor, titulo, descricao, preco, id_categoria, destaque } = req.body;

            const arquivos = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const capa = arquivos?.["capa_imagem"]?.[0];
            const pdf = arquivos?.["arquivo_pdf"]?.[0];

            const livro = await Livro.create({
                id_autor,
                titulo,
                descricao,
                preco,
                id_categoria,
                capa_imagem: capa ? capa.filename : null,
                arquivo_pdf: pdf ? pdf.filename : null,
                destaque
            });

            return res.status(201).json(livro);

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
            const { id_autor, titulo, descricao, preco, id_categoria, destaque } = req.body;
            const livro = await Livro.findByPk(Number(id));

            if (!livro) {
                return res.status(404).json({ mensagem: "Livro não encontrado" });
            }

            const arquivos = req.files as { [fieldname: string]: Express.Multer.File[] };

            const capa_imagem = arquivos?.["capa_imagem"]?.[0]?.filename ?? livro.capa_imagem;
            const arquivo_pdf = arquivos?.["arquivo_pdf"]?.[0]?.filename ?? livro.arquivo_pdf;


            await livro.update({
                id_autor,
                titulo,
                descricao,
                preco,
                capa_imagem,
                arquivo_pdf,
                id_categoria,
                destaque
            });
            return res.status(200).json({ mensagem: "Livro atualizado com sucesso" });

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const livro = await Livro.findByPk(Number(id));

            if (!livro) {
                return res.status(404).json({ mensagem: "Livro não encontrado" });
            }

            await livro.destroy();
            return res.status(200).json({ mensagem: "Livro removido com sucesso" });

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async getDestaques(req: Request, res: Response) {
        try {
            const livros = await Livro.findAll({
                where: { destaque: true },
                include: [
                    { association: "autor" },
                    { association: "categoria" }
                ]
            });

            return res.status(200).json(livros);

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }
}

export default LivroController;