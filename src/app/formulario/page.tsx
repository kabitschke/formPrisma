"use client";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faBuilding, faCity, faContactCard, faEnvelope, faHashtag, faHome, faLocation, faLocationDot, faMapLocation, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

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
            <form onSubmit={handleSubmit(onSubmit)} className="form">

                <div className="info_area">
                    <div className="info_ico">
                        <FontAwesomeIcon
                            icon={faUser}
                        /></div>

                    <div className="info-area-text">
                        <h2>Dados pessoais</h2>
                        <div className="info-text">Informações de contato e pessoais</div>
                    </div>
                </div>

                <div className="grid-3">
                    <Input
                        label="Nome"
                        id="nome"
                        span="*"
                        icon={faUser}
                        register={register}
                        error={errors.nome?.message}
                    />

                    <Input
                        label="Email"
                        id="email"
                        span="*"
                        icon={faEnvelope}
                        register={register}
                        error={errors.email?.message}
                    />

                    <div className="input-container">
                        <label htmlFor="celular">Celular <span>*</span></label>

                        <FontAwesomeIcon
                            icon={faPhone}
                            className="input-icon-mask"
                        />

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

                <div className="grid-2">

                    <div className="input-container">
                        <label htmlFor="cpf">CPF <span>*</span></label>
                        <FontAwesomeIcon
                            icon={faContactCard}
                            className="input-icon-mask"
                        />
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

                    <div className="select-item">
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

                <div className="info_area">
                    <div className="info_ico">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                        /></div>

                    <div className="info-area-text">
                        <h2>Endereço</h2>
                        <div className="info-text">Informações de localização</div>
                    </div>
                </div>

                <div className="grid-address">
                    <Input
                        label="Rua"
                        id="rua"
                        icon={faHome}
                        register={register}
                        span="*"
                        error={errors.rua?.message}
                    />

                    <Input
                        label="Número"
                        id="numero"
                        span="*"
                        icon={faHashtag}
                        register={register}
                        error={errors.numero?.message}
                    />

                </div>

                <div className="grid-3">



                    <Input
                        label="Cidade"
                        id="cidade"
                        span="*"
                        icon={faCity}
                        register={register}
                        error={errors.cidade?.message}
                    />

                    <Input
                        label="Bairro"
                        id="bairro"
                        span="*"
                        icon={faMapLocation}
                        register={register}
                        error={errors.bairro?.message}
                    />

                    <div className="input-container">
                        <label htmlFor="cep">CEP <span>*</span></label>
                        <FontAwesomeIcon
                            icon={faBarcode}
                            className="input-icon-mask"
                        />
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


                <div className="grid-2">

                    <div className="select-item">
                        <label htmlFor="estado">Estado <span>*</span></label>
                        <select {...register("estado")} id="estado" className={errors.estado ? "input error" : "input"} >
                            <option value="">Estado <span>*</span></option>
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
                    {isEditing ? "Atualizar" : "Salvar"}
                </button>


            </form>

        </>
    );
}