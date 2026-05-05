import { InputProps } from "../types/inputs";

export function Input({ label, id, register, error, type = "text" }: InputProps) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>

            <input
                {...register(id)}
                id={id}
                type={type}
                className={error ? "input error" : "input"}
            />

            {error && <span>{error}</span>}
        </div>
    );
}