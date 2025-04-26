import { useState } from "react";
import '../css/RegisterInput.css'

function RegisterInput(props){
    const {label, errorMessage, onChange, id, ...inputProps} = props;
    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    }

    return(
        <div className = "formInput">
            <label> {label} </label>
            <input {...inputProps} onChange ={onChange} onBlur = {handleFocus} focused = {focused.toString()} onFocus = {() => inputProps.name === "confirmPassword" && setFocused(true)}/>
            <span>{errorMessage}</span>
        </div>
    )
}

export default RegisterInput;