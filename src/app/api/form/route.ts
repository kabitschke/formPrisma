import { prisma } from '@/lib/prisma'
//import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

type TokenPayload = {
  userId: string;
  email: string;
};

// export async function GET(req: Request) {
//   const authHeader = req.headers.get("authorization");
//   const token = authHeader?.split(" ")[1];

//   if (!token) {
//     return Response.json({ error: "Token não enviado" }, { status: 401 });
//   }

//   let decoded: TokenPayload;

//   try {
//     decoded = jwt.verify(token, "segredo_super_secreto") as TokenPayload;
//   } catch {
//     return Response.json({ error: "Token inválido" }, { status: 401 });
//   }

//   const contatos = await prisma.contato.findMany({
//     where: {
//       userId: decoded.userId,
//     },
//   });

//   return Response.json(contatos);
// }

//Função para buscar todos os contatos do banco de dados usando Prisma
export async function GET() {
  const contatos = await prisma.contato.findMany();

  return Response.json(contatos);
}

//Função para adicionar um novo contato ao banco de dados usando Prisma
// export async function POST(req: Request) {
//   const body = await req.json();

//   const form = await prisma.contato.create({
//     data: body
//   })


//   return NextResponse.json(form)
// }

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return Response.json({ error: "Token não enviado" }, { status: 401 });
  }

  let decoded: TokenPayload;

  try {
    decoded = jwt.verify(token, "segredo_super_secreto") as TokenPayload;
  } catch {
    return Response.json({ error: "Token inválido" }, { status: 401 });
  }

  const body = await req.json();

  const contato = await prisma.contato.create({
    data: {
      ...body,
      userId: decoded.userId, // 🔥 liga com usuário
    },
  });

  return Response.json(contato);
}

