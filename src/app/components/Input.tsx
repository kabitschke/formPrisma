import { InputProps } from "../types/inputs";
import styles from "../formulario/page.module.css";

export function Input({
    label,
    id,
    register,
    error,
    span,
    icon: Icon,
    type = "text",
}: InputProps) {
    return (
        <div>
            <label htmlFor={id}>
                {label} <span>{span}</span>
            </label>

            <div className={styles.inputContainer}>
                {Icon && (
                    <Icon className={styles.inputIcon} size={20} />
                )}

                <input
                    {...register(id)}
                    id={id}
                    type={type}
                    className={error ? `${styles.input} ${styles.error}` : styles.input}
                />
            </div>

            {error && <span>{error}</span>}
        </div>
    );
}