"use client";

import { useState } from "react";
//import bcrypt from "bcryptjs";
import { loginSchema, LoginData } from "../app/components/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginData) {
    //e.preventDefault();

    setApiError(""); // limpa erro anterior

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.token) {
      localStorage.setItem("token", result.token);
      window.location.href = "/contatos";
    } else {
      setApiError(result.error);
    }
  }


  /** 
    async function gerarHash() {
      const hash = await bcrypt.hash("123456", 10);
      console.log(hash);
    }
  
    gerarHash();
  $2b$10$9TkYLlBDRjmW/Pfpeu0Z3.8wyk4o4mTJkG0irFGijbMEzvkxZp89y
  
    */

  return (
    <div className="login-container">
      <div className="login-area">
        <h1>Login</h1>

        <form onSubmit={handleSubmit(handleLogin)}>

          <label>Email:</label>
          <input type="text" {...register("email")}
            className={errors.email ? "input error" : "input"}
          />
          {apiError === "Usuário não encontrado" && (
            <span>{apiError}</span>
          )}


          {/* SENHA */}
          <label>Senha:</label>
          <input type="password" {...register("password")}
            className={errors.password ? "input error" : "input"}
          />
          {apiError === "Senha inválida" && (
            <span>{apiError}</span>
          )}

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}