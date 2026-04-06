"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "../components/schema";
import { IMaskInput } from "react-imask";


export default function Form() {


    function onSubmit(data: FormData) {
        handleAddContato(data);
    }


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            celular: "",
            cpf: "",
            cep: "",
        },
    });

    async function handleAddContato(data: FormData) {
        if (!data) return

        await fetch('/api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)



        })
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">

            <input
                {...register("nome")}
                placeholder="Nome"
                className={errors.nome ? "input error" : "input"}
            />
            {errors.nome && <span>{errors.nome.message}</span>}

            <input
                {...register("email")}
                placeholder="Email"
                className={errors.email ? "input error" : "input"}
            />
            {errors.email && <span>{errors.email.message}</span>}


            <Controller
                name="celular"
                control={control}
                render={({ field }) => (
                    <IMaskInput
                        mask="(00) 00000-0000"
                        value={field.value}
                        onAccept={(value) => field.onChange(value)}
                        placeholder="Celular"
                        className={errors.celular ? "input error" : "input"}
                    />
                )}
            />
            {errors.celular && <span>{errors.celular.message}</span>}

            <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                    <IMaskInput
                        mask="000.000.000-00"
                        value={field.value}
                        onAccept={(value) => field.onChange(value)}
                        placeholder="CPF"
                        className={errors.cpf ? "input error" : "input"}
                    />
                )}
            />
            {errors.cpf && <span>{errors.cpf.message}</span>}



            <input
                {...register("rua")}
                placeholder="Rua"
                className={errors.rua ? "input error" : "input"}
            />
            {errors.rua && <span>{errors.rua.message}</span>}

            <input
                type="number"
                {...register("numero", { valueAsNumber: true })}
                placeholder="Número"
                className={errors.numero ? "input error" : "input"}
            />
            {errors.numero && <span>{errors.numero.message}</span>}

            <input
                {...register("cidade")}
                placeholder="Cidade"
                className={errors.cidade ? "input error" : "input"}
            />
            {errors.cidade && <span>{errors.cidade.message}</span>}

            <input
                {...register("bairro")}
                placeholder="Bairro"
                className={errors.bairro ? "input error" : "input"}
            />
            {errors.bairro && <span>{errors.bairro.message}</span>}

            <Controller
                name="cep"
                control={control}
                render={({ field }) => (
                    <IMaskInput
                        mask="00000-000"
                        value={field.value}
                        onAccept={(value) => field.onChange(value)}
                        placeholder="CEP"
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