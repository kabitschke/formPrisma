"use client";
import styles from "./header.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [nome, setNome] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem("token");

            const res = await fetch("/api/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setNome(data.nome);
        }
        loadUser();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        router.replace("/"); // evita voltar com botão "voltar"
    }



    return (
        <div className={styles.user}>
            <span>Olá, {nome}</span>
            <a onClick={handleLogout}>Sair</a>
        </div>
    )

}