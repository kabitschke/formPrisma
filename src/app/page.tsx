"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { loginSchema, LoginData } from "../app/components/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput } from "./components/LoginInput";

export default function Home() {
  const [apiError, setApiError] = useState("");
  const [passwordField, setPasswordField] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginData) {

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

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginArea}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit(handleLogin)} className={styles.login}>

          {apiError && (
            <span className="errorLogin"><span style={{ fontWeight: "bold" }}>Erro</span>{apiError}</span>
          )}

          <label>Email:</label>
          <input type="text" {...register("email")}
            className={errors.email ? "input error" : "input"}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <LoginInput
            id="password"
            label="Senha:"
            password={true}
            register={register}
            onChange={t => setPasswordField(t)}
            error={errors.password?.message}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}