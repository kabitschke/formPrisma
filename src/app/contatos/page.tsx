"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type Contato = {
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

export default function ContatosPage() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const router = useRouter();

  async function loadContatos() {
    const response = await fetch("/api/form");
    const data = await response.json();
    setContatos(data);
  }

  async function handleDelete(id: number) {

  }

  async function handleEdit(id: number) {
    router.push(`/?id=${id}`);

  }

  useEffect(() => {
    loadContatos();
  }, []);

  return (
    <div>
      <h1>Lista de Contatos</h1>

      <div className="container">



        <table>
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
  );
}