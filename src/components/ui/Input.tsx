import * as React from "react";

interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => string,
    value: string,
    className?: string;
}

const Input = ({onChange, value, className = ''}: InputProps) => {
    return (
        <input
            onChange={onChange}
            value={value}
            className={`border-2 border-border h-15.25 rounded-lg ${className}`}
        />
    )
}

export default Input
