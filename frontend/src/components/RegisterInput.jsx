import { useState } from "react";
import styles from '../css/RegisterInput.module.css';

function RegisterInput(props) {
    const { label, errorMessage, onChange, id, ...inputProps } = props;
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    return (
        <div className={styles.formInput}>
            <label className={styles.label}>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                focused={focused.toString()}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                className={styles.input}
            />
            <span className={styles.span}>{errorMessage}</span>
        </div>
    );
}

export default RegisterInput;
