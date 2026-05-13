"use client";
import styles from "./page.module.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../components/schema";
import { IMaskInput } from "react-imask";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../components/Header";
import { ContatoForm } from "../types/contact";
import { Input } from "../components/Input";
import { Barcode, Building2, Hash, House, IdCard, Mail, MapIcon, MapPin, Phone, Save, UserRound } from 'lucide-react';


export default function Formulario() {

    const [token, setToken] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    useEffect(() => {
        const tokenlocal = localStorage.getItem("token");
        setToken(tokenlocal);

        if (!tokenlocal) {
            router.replace('/');
        }
    }, []);

    async function onSubmit(data: ContatoForm) {

        if (isEditing && editId) {
            // Atualiza contato existente
            await fetch(`/api/form/${editId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });


        } else {
            // Cria um novo contato
            const response = await fetch("/api/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                console.log("Erro backend:", error);
                alert(error.error || "Erro ao salvar");
                return;
            }

        }
        //Limpa os campos
        reset({
            nome: "",
            email: "",
            celular: "",
            cpf: "",
            rua: "",
            numero: "",
            cidade: "",
            bairro: "",
            cep: "",
            estado: "",
            estadoCivil: "",
        });


        clearErrors();

        setIsEditing(false);
        setEditId(null);
        //Redireciona para a página de contatos
        router.replace("/contatos");
    }


    const form = useForm<
        z.input<typeof formSchema>,   // entrada (form)
        ContatoForm,
        z.output<typeof formSchema>   // saída (transformado)
    >({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        //reValidateMode: "onSubmit", //  resolve erro das máscaras
        defaultValues: {
            celular: "",
            cpf: "",
            cep: "",
        },
    });

    const {
        register,
        clearErrors,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = form;

    useEffect(() => {
        if (!id) return;

        async function loadContact() {
            const response = await fetch(`/api/form/${id}`);
            const data = await response.json();

            reset({
                ...data,
                numero: String(data.numero), // 👈 importante se seu input é string
            });

            setIsEditing(true);
            setEditId(Number(id));
        }

        loadContact();
    }, [id]);

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                <div className={styles.infoArea}>
                    <div className={styles.infoIco}>
                        <UserRound />
                    </div>

                    <div >
                        <h2>Dados pessoais</h2>
                        <div className={styles.infoText}>Informações de contato e pessoais</div>
                    </div>
                </div>

                <div className={styles.grid3}>
                    <Input
                        label="Nome"
                        id="nome"
                        span="*"
                        icon={UserRound}
                        register={register}
                        error={errors.nome?.message}
                    />

                    <Input
                        label="Email"
                        id="email"
                        span="*"
                        icon={Mail}
                        register={register}
                        error={errors.email?.message}
                    />

                    <div className={styles.inputContainer}>
                        <label htmlFor="celular">Celular <span>*</span></label>

                        <div className={styles.inputIconMask}>
                            <Phone />
                        </div>

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
                    </div>

                </div>

                <div className={styles.grid2}>

                    <div className={styles.inputContainer}>
                        <label htmlFor="cpf">CPF <span>*</span></label>

                        <div className={styles.inputIconMask}>
                            <IdCard />
                        </div>
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
                    </div>

                    <div className={styles.selectItem}>
                        <label htmlFor="estadocivil">Estado civil <span>*</span></label>
                        <select {...register("estadoCivil")} id="estadocivil" className={errors.estadoCivil ? "input error" : "input"}>
                            <option value="">Estado Civil</option>
                            <option value="solteiro">Solteiro</option>
                            <option value="casado">Casado</option>
                            <option value="divorciado">Divorciado</option>
                            <option value="viuvo">Viúvo</option>
                        </select>
                        <div>
                            {errors.estadoCivil && <span>{errors.estadoCivil.message}</span>}
                        </div>
                    </div>
                </div>

                <div className={styles.infoArea}>
                    <div className={styles.infoIco}>
                        <MapPin />
                    </div>

                    <div>
                        <h2>Endereço</h2>
                        <div className={styles.infoText}>Informações de localização</div>
                    </div>
                </div>

                <div className={styles.gridAddress}>
                    <Input
                        label="Rua"
                        id="rua"
                        icon={House}
                        register={register}
                        span="*"
                        error={errors.rua?.message}
                    />

                    <Input
                        label="Número"
                        id="numero"
                        span="*"
                        icon={Hash}
                        register={register}
                        error={errors.numero?.message}
                    />

                </div>

                <div className={styles.grid3}>

                    <Input
                        label="Cidade"
                        id="cidade"
                        span="*"
                        icon={Building2}
                        register={register}
                        error={errors.cidade?.message}
                    />

                    <Input
                        label="Bairro"
                        id="bairro"
                        span="*"
                        icon={MapIcon}
                        register={register}
                        error={errors.bairro?.message}
                    />

                    <div className={styles.inputContainer}>
                        <label htmlFor="cep">CEP <span>*</span></label>

                        <div className={styles.inputIconMask}>
                            <Barcode />
                        </div>
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
                    </div>

                </div>


                <div className={styles.grid2}>

                    <div className={styles.selectItem}>
                        <label htmlFor="estado">Estado <span>*</span></label>
                        <select {...register("estado")} id="estado" className={errors.estado ? "input error" : "input"} >
                            <option value="">Estado </option>
                            {[
                                "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                                "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                                "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                            ].map((uf) => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                        <div>
                            {errors.estado && <span>{errors.estado.message}</span>}
                        </div>
                    </div>

                    <Input
                        label="Complemento"
                        id="complemento"
                        register={register}
                        error={errors.complemento?.message}
                    />
                </div>

                <button type="submit">
                    <div className={styles.btnForm}>
                        <Save />
                        {isEditing ? "Atualizar" : "Salvar"}
                    </div>
                </button>
            </form>
        </>
    );
}