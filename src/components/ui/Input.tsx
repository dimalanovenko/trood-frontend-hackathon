import * as React from "react";

interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // The function to handle changes in the input field
    value: string | undefined; // The current value of the input field can be a string or undefined
    className?: string; // Optional className for additional styling
}

const Input = ({ onChange, value, className = '' }: InputProps) => {
    return (
        <input
            onChange={onChange} // When the input value changes, this handler will be triggered
            value={value} // The current value of the input field is bound to `value`
            className={`border-2 border-border h-15.25 rounded-lg ${className}`}
            // Applies a default border and height styles, allows additional custom styling via `className`
            required // Marks the input as required for form submission
        />
    );
}

export default Input;

