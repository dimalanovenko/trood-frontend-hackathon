interface ButtonProps {
    text: string; // The text that will be displayed inside the button
    onClick?: () => void; // Optional callback function to be called when the button is clicked
    className?: string; // Optional additional class names to style the button
    disabled?: boolean; // Optional boolean to disable the button (prevents clicking)
}

const Button = ({ text, onClick, className, disabled }: ButtonProps) => {
    return (
        <button
            disabled={disabled} // Button is disabled if the `disabled` prop is passed
            onClick={onClick} // When the button is clicked, the `onClick` function (if provided) will be triggered
            className={`text-black text-xl font-medium bg-btn-bg py-2.5 px-6 rounded-3xl cursor-pointer ${className}`}
            // The className combines predefined button styles with any additional classNames passed through the `className` prop
        >
            {text} {/* The button text is displayed inside */}
        </button>
    );
}

export default Button;

