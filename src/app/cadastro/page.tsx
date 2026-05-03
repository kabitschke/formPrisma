"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema, CadastroData } from "../components/cadastroSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cadastro() {
    const router = useRouter();
    const [apiError, setApiError] = useState('');

    const {//Objeto react-hook-form
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroData>({//zod schema
        resolver: zodResolver(cadastroSchema),
    });

    async function handleLogin(data: CadastroData) {

        const res = await fetch("/api/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });


        const result = await res.json();

        if (res.ok) {
            router.replace("/");
        } else {
            setApiError(result.error);
        }
    }


    return (
        <form onSubmit={handleSubmit(handleLogin)} className="form">

            <label htmlFor="email">Email:</label>
            <input
                {...register("email")}
                id="email"
                className={errors.email ? "input error" : "input"}
            />
            <span>{apiError}</span>
            {errors.email && <span>{errors.email.message}</span>}

            <label htmlFor="password">Senha:</label>
            <input
                type="password"
                {...register("password")}
                id="password"
                className={errors.password ? "input error" : "input"}

            />
            {errors.password && <span>{errors.password.message}</span>}



            <button type="submit">Cadastrar</button>
        </form>

    )
}