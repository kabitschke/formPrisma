import { z } from "zod";

export const formSchema = z.object({
    nome: z.string().min(2, "Preencha o campo corretamente")
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
    rua: z.string().min(2, "Preencha o campo corretamente")
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Preencha o campo corretamente"),
    numero: z
        .string()
        .min(1, "Preencha o campo corretamente")
        .regex(/^\d+$/, "Apenas números")
        .transform((val) => Number(val)),
    bairro: z.string().min(2, "Preencha o campo corretamente")
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Preencha o campo corretamente"),
    celular: z
        .string()
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Preencha o campo corretamente"),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Preencha o campo corretamente"),
    cep: z.string().regex(/^\d{5}-\d{3}$/, "Preencha o campo corretamente"),
    email: z.string().email("Email inválido"),
    cidade: z.string().min(2, "Cidade obrigatória")
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Cidade deve conter apenas letras"),
    estado: z.string().length(2, "Selecione um estado"),
    estadoCivil: z.string().min(1, "Selecione o estado civil"),
});

export type FormData = z.infer<typeof formSchema>;