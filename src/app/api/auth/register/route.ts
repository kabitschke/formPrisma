import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const userExists = await prisma.user.findUnique({
        where: { email },
    });

    if (userExists) {
        return Response.json({ error: "Usuário já existe" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return Response.json(user);
}