import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

//Função para adicionar um novo contato ao banco de dados usando Prisma
export async function POST(req: Request) {
  const body = await req.json();

  const form = await prisma.contato.create({
    data: body
  })


  return NextResponse.json(form)
}

