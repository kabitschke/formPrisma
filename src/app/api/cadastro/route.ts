import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // verifica se já existe
    const userExists = await prisma.user.findUnique({
        where: { email },
    });

    if (userExists) {
        return Response.json({ error: "Usuário já existente" }, { status: 400 });
    }

    //  criptografa aqui
    const hashedPassword = await bcrypt.hash(password, 10);

    //  salva no banco (tabela User)
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return Response.json(user);
}