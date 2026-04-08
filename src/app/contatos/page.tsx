"use client";

import { useEffect, useState } from "react";


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

  async function loadContatos() {
    const response = await fetch("/api/form");
    const data = await response.json();
    setContatos(data);
  }

  useEffect(() => {
    loadContatos();
  }, []);

  return (
    <div>
      <h1>Lista de Contatos</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Celular</th>
            <th>CPF</th>
            <th>Rua</th>
            <th>Numero</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>CEP</th>
            <th>Estado</th>
            <th>Estado Civil</th>
          </tr>
        </thead>

        <tbody>
          {contatos.map((contato) => (
            <tr key={contato.id}>
              <td>{contato.nome}</td>
              <td>{contato.email}</td>
              <td>{contato.celular}</td>
              <td>{contato.cpf}</td>
              <td>{contato.rua}</td>
              <td>{contato.numero}</td>
              <td>{contato.cidade}</td>
              <td>{contato.bairro}</td>
              <td>{contato.cep}</td>
              <td>{contato.estado}</td>
              <td>{contato.estadoCivil}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}