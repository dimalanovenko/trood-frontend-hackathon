interface TitleProps {
    text: string | undefined; // The text to be displayed in the title, which could be undefined if not provided
    className?: string; // Optional additional className for custom styling
}

const Title = ({text, className}: TitleProps) => {
    return (
        <h1 className={`font-medium text-[32px] text-black ${className}`}>
            {/* Tailwind CSS classes:
                `font-medium`: applies a medium font weight to the title
                `text-[32px]`: custom text size of 32px (the value inside square brackets is a Tailwind feature for custom sizes)
                `text-black`: applies black color to the text
                `${className}`: applies any custom className passed as a prop, allowing for additional styling */}
            {text} {/* The actual text that will be displayed */}
        </h1>
    );
}

export default Title;
