import { z } from "zod";

export const formSchema = z.object({
    nome: z.string().min(2, "Preencha o campo corretamente")
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
    sobrenome: z.string().min(2, "Preencha o campo corretamente")
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Sobrenome deve conter apenas letras"),
    celular: z
        .string()
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Preencha o campo corretamente"),
    email: z.string().email("Email inválido"),
    cidade: z.string().min(2, "Cidade obrigatória")
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Cidade deve conter apenas letras"),
    estado: z.string().length(2, "Selecione um estado"),
    estadoCivil: z.string().min(1, "Selecione o estado civil"),
});

export type FormData = z.infer<typeof formSchema>;