import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "segredo_super_secreto";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return Response.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return Response.json({ error: "Senha inválida" }, { status: 401 });
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    );

    return Response.json({ token });
}