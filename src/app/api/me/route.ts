import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = "segredo_super_secreto";

export async function GET(req: Request) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return Response.json({ error: "Token não enviado" }, { status: 401 });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
        return Response.json({ error: "Token inválido" }, { status: 401 });
    }

    const contato = await prisma.contato.findFirst({
        where: {
            userId: decoded.userId,
        },
    });

    return Response.json({
        nome: contato?.nome || "Usuário",
    });
}