export type Contato = {
    id: number;
    nome: string;
    email: string;
    celular: string;
    cpf: string;
    rua: string;
    numero: number;
    cidade: string;
    bairro: string;
    cep: string;
    estado: string;
    estadoCivil: string;
};

export type ContatoForm = Omit<Contato, "id">;