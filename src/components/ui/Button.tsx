interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const Button = ({text, onClick}: ButtonProps) => {
    return (
        <button onClick={onClick} className="text-black text-xl font-medium bg-btn-bg py-2.5 px-6 rounded-3xl">
            {text}
        </button>
    )
}

export default Button
