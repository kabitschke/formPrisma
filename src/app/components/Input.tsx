import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputProps } from "../types/inputs";

export function Input({
    label,
    id,
    register,
    error,
    span,
    icon,
    type = "text",
}: InputProps) {
    return (
        <div>
            <label htmlFor={id}>
                {label} <span>{span}</span>
            </label>

            <div className="input-container">
                {icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className="input-icon"
                    />
                )}

                <input
                    {...register(id)}
                    id={id}
                    type={type}
                    className={error ? "input error" : "input"}
                />
            </div>

            {error && <span>{error}</span>}
        </div>
    );
}