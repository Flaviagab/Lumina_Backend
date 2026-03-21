import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
            return res.status(401).json({
                mensagem: "Token não fornecido"
            });
        }
        
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET as string);

        next();

    } catch (erro) {
        return res.status(403).json({
            mensagem: "Token inválido"
        });
    }
}