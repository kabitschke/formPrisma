import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const contato = await prisma.contato.findUnique({
        where: {
            id: Number(id),
        },
    });

    return Response.json(contato);
}

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const body = await req.json();

    const updatedContato = await prisma.contato.update({
        where: {
            id: Number(id),
        },
        data: body,
    });

    return Response.json(updatedContato); // 👈 IMPORTANTE
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    await prisma.contato.delete({
        where: {
            id: Number(id)
        }
    })

    return Response.json({ ok: true })
}