"use client";

import { useState } from "react";
import { Eye, EyeClosed, LucideIcon } from "lucide-react";

type InputProps = {
    label: string;
    id: string;
    password?: boolean;
    register: any;
    error?: string;
    type?: string;
    icon?: LucideIcon;
    onChange?: (newValue: string) => void;
};

export function LoginInput({
    label,
    id,
    icon: Icon,
    register,
    error,
    password,
    type = "text",
    onChange,
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = password
        ? showPassword
            ? "text"
            : "password"
        : type;

    return (
        <div className="">
            <label htmlFor={id}>{label}</label>

            <div className="input-container">
                {Icon && (
                    <Icon className="input-icon" size={20} />
                )}

                <input
                    {...register(id)}
                    id={id}
                    type={inputType}
                    className={error ? "input error" : "input"}
                    onChange={(e) =>
                        onChange && onChange(e.target.value)
                    }
                />

                {password && (
                    <div
                        className="icon-button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {showPassword ? (
                            <Eye size={20} />
                        ) : (
                            <EyeClosed size={20} />
                        )}
                    </div>
                )}
            </div>
            {error && <span>{error}</span>}
        </div>
    );
}