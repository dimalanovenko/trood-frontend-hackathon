import * as React from "react";

interface TextAreaProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, // Function to handle the change event in the textarea
    value: string | undefined, // The current value of the textarea
    className?: string; // Optional additional className for custom styling
}

const TextArea = ({onChange, value, className = ''}: TextAreaProps) => {
    return (
        <textarea
            onChange={onChange} // The onChange handler passed as a prop, which is triggered when the textarea content changes
            value={value} // The current value of the textarea (controlled input)
            className={`border-2 border-border h-40.5 rounded-lg ${className}`}
            // Tailwind CSS classes:
            // `border-2`: applies a 2px border around the textarea
            // `border-border`: uses a custom border color, assumed to be defined elsewhere in your styles
            // `h-40.5`: sets the height of the textarea (this value is custom)
            // `rounded-lg`: applies a large border-radius for rounded corners
            // `${className}` allows for any additional styles passed as a prop
        />
    );
}

export default TextArea;

