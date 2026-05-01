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


  /*
    async function gerarHash() {
      const hash = await bcrypt.hash("123456", 10);
      console.log(hash);
    }
  
    gerarHash();
 
  $2b$10$gyiEA7NeuJ.2bGRIPi19p.VT5A9XKT9BMmu1uVL9q07tbLVW4MkdC

  */



  return (
    <div className="login-container">
      <div className="login-area">
        <h1>Login</h1>

        <form onSubmit={handleSubmit(handleLogin)} className="form">

          <label>Email:</label>
          <input type="text" {...register("email")}
            className={errors.email ? "input error" : "input"}
          />
          {apiError === "Usuário não encontrado" && (
            <span>{apiError}</span>
          )}  {errors.email && <span>{errors.email.message}</span>}


          {/* SENHA */}
          <label>Senha:</label>
          <input type="password" {...register("password")}
            className={errors.password ? "input error" : "input"}
          />
          {apiError === "Senha inválida" && (
            <span>{apiError}</span>
          )} {errors.password && <span>{errors.password.message}</span>}

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}