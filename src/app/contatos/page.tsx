"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { Contato } from "../types/contact";

export default function ContatosPage() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace('/');
    }
  }, []);

  const [contatos, setContatos] = useState<Contato[]>([]);
  const router = useRouter();

  async function loadContatos() {
    const response = await fetch("/api/form");
    const data = await response.json();
    setContatos(data);
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir? Todos os dados relacionados a esse contato serão perdidos.')

    if (!confirmDelete) return

    await fetch(`/api/form/${id}`, {
      method: 'DELETE'
    })

    loadContatos()
  }

  async function handleEdit(id: number) {
    router.push(`/formulario/?id=${id}`);
  }

  useEffect(() => {
    loadContatos();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Lista de Contatos</h1>

        <div className={styles.contatos}>
          <table className={styles.contatosTable}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Celular</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {contatos.map((contato) => (
                <tr key={contato.id}>
                  <td>{contato.nome}</td>
                  <td>{contato.email}</td>
                  <td>{contato.celular}</td>
                  <td>{contato.cpf}</td>
                  <td>
                    <button onClick={() => handleEdit(contato.id)}>✏️</button>
                    <button onClick={() => handleDelete(contato.id)}>❌</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}