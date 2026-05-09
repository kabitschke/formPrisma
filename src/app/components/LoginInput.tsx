"use client"

import { useState } from "react";
import { faEye, faEyeSlash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type InputProps = {
    label: string;
    id: string;
    password?: boolean;
    register: any;
    error?: string;
    type?: string;
    icon?: IconDefinition;
    onChange?: (newValue: string) => void;
};

export function LoginInput({ label, id, icon, register, error, password, type, onChange }: InputProps) {

    const [showPassword, setShowPassword] = useState(false);


    return (
        <div>
            <label htmlFor={id}>{label}</label>

            {
                icon &&
                <FontAwesomeIcon
                    icon={icon}
                    className="icon"
                />
            }

            <input
                {...register(id)}
                id={id}
                type={password && !showPassword ? 'password' : 'text'}//verifica se password esta true ou false, e ShowPassword true ou false altera para mostrar senha ou ocultar, muda o campo de password para text e vice versa.
                className={error ? "input error" : "input"}
                onChange={e => onChange && onChange(e.target.value)}
            />

            {error && <span>{error}</span>}

            {
                password &&
                <FontAwesomeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    //Olhinho do campo senha mostra ele aberto ou fechado dependendo de Showpassword que sempre que for clicado inverte o resultado.
                    icon={showPassword ? faEye : faEyeSlash}
                    className="icone"
                />
            }
        </div>
    );
}