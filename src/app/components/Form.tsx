"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "../components/schema";
import { IMaskInput } from "react-imask";
import { z } from "zod";
import { useState } from "react";
import { useEffect } from "react";
import { id } from "zod/locales";




export default function Form() {

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    function onSubmit(data: z.output<typeof formSchema>) {
        if (isEditing && editId) {
            handleEditContact(data);
        } else {
            handleAddContato(data);
        }
    }
    const form = useForm<
        z.input<typeof formSchema>,   // entrada (form)
        any,
        z.output<typeof formSchema>   // saída (transformado)
    >({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        defaultValues: {
            celular: "",
            cpf: "",
            cep: "",
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = form;

    async function handleAddContato(data: z.output<typeof formSchema>) {
        if (!data) return;

        await fetch('/api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        reset(); // Limpa o formulário após o envio
    }


    async function handleLoadContact(id: number) {
        const response = await fetch(`/api/form/${id}`);
        const data = await response.json();

        reset({
            ...data,
            numero: String(data.numero),
        });

        setIsEditing(true);
        setEditId(id);
    }

    useEffect(() => {
        handleLoadContact(2);
    }, []);


    async function handleEditContact(data: z.output<typeof formSchema>) {
        if (!editId) return;

        await fetch(`/api/form/${editId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        reset();
        setIsEditing(false);
        setEditId(null);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <label htmlFor="nome">Nome:</label>
            <input
                {...register("nome")}
                id="nome"
                className={errors.nome ? "input error" : "input"}
            />
            {errors.nome && <span>{errors.nome.message}</span>}
            <label htmlFor="email">Email:</label>
            <input
                {...register("email")}
                id="email"
                className={errors.email ? "input error" : "input"}
            />
            {errors.email && <span>{errors.email.message}</span>}

            <label htmlFor="celular">Celular:</label>
            <Controller
                name="celular"
                control={control}
                render={({ field }) => (
                    <IMaskInput
                        mask="(00) 00000-0000"
                        value={field.value}
                        onAccept={(value) => field.onChange(value)}
                        id="celular"
                        className={errors.celular ? "input error" : "input"}
                    />
                )}
            />
            {errors.celular && <span>{errors.celular.message}</span>}

            <label htmlFor="cpf">CPF:</label>
            <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                    <IMaskInput
                        mask="000.000.000-00"
                        value={field.value}
                        onAccept={(value) => field.onChange(value)}
                        id="cpf"
                        className={errors.cpf ? "input error" : "input"}
                    />
                )}
            />
            {errors.cpf && <span>{errors.cpf.message}</span>}


            <label htmlFor="rua">Rua:</label>
            <input
                {...register("rua")}
                id="rua"
                className={errors.rua ? "input error" : "input"}
            />
            {errors.rua && <span>{errors.rua.message}</span>}

            <label htmlFor="numero">Número:</label>
            <input
                {...register("numero")}
                id="numero"
                className={errors.numero ? "input error" : "input"}
            />
            {errors.numero && <span>{errors.numero.message}</span>}

            <label htmlFor="cidade">Cidade:</label>
            <input
                {...register("cidade")}
                id="cidade"
                className={errors.cidade ? "input error" : "input"}
            />
            {errors.cidade && <span>{errors.cidade.message}</span>}

            <label htmlFor="bairro">Bairro:</label>
            <input
                {...register("bairro")}
                id="bairro"
                className={errors.bairro ? "input error" : "input"}
            />
            {errors.bairro && <span>{errors.bairro.message}</span>}

            <label htmlFor="cep">CEP:</label>
            <Controller
                name="cep"
                control={control}
                render={({ field }) => (
                    <IMaskInput
                        mask="00000-000"
                        value={field.value}
                        onAccept={(value) => field.onChange(value)}
                        id="cep"
                        className={errors.cep ? "input error" : "input"}
                    />
                )}
            />
            {errors.cep && <span>{errors.cep.message}</span>}

            <select {...register("estado")} className={errors.estado ? "input error" : "input"} >
                <option value="">Estado</option>
                {[
                    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                ].map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                ))}
            </select>
            {errors.estado && <span>{errors.estado.message}</span>}

            <select {...register("estadoCivil")} className={errors.estadoCivil ? "input error" : "input"}>
                <option value="">Estado Civil</option>
                <option value="solteiro">Solteiro</option>
                <option value="casado">Casado</option>
                <option value="divorciado">Divorciado</option>
                <option value="viuvo">Viúvo</option>
            </select>
            {errors.estadoCivil && <span>{errors.estadoCivil.message}</span>}

            <button type="submit">Enviar</button>
        </form>
    );
}