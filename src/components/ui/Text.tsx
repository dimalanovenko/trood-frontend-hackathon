interface TextProps {
    text?: string; // The text to display (optional, can be undefined)
    className?: string; // Optional custom class for additional styling
}

const Text = ({text, className}: TextProps) => {
    return (
        <span className={`font-normal text-lg text-black ${className}`}>
            {/*
                The `span` element is used for inline text formatting.
                - `font-normal`: applies normal font weight.
                - `text-lg`: applies a large font size.
                - `text-black`: sets the text color to black.
                - `${className}` allows for optional additional classes passed from the parent component to customize the styling.
            */}
            {text} {/* Renders the `text` passed as a prop */}
        </span>
    );
}

export default Text;
