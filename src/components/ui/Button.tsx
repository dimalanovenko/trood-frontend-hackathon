interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const Button = ({text, onClick}: ButtonProps) => {
    return (
        <button onClick={onClick} className="">
            {text}
        </button>
    )
}

export default Button
