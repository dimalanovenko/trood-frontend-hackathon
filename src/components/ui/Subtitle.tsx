interface SubtitleProps {
    text?: string; // The subtitle text to display (optional, as it can be undefined)
    className?: string; // Optional custom class for styling
}

const Subtitle = ({text, className}: SubtitleProps) => {
    return (
        <h2 className={`font-medium text-2xl text-black ${className}`}>
            {/*
                The `h2` element is used to define a subtitle.
                - `font-medium`: applies a medium font weight.
                - `text-2xl`: applies a large font size (2xl).
                - `text-black`: sets the text color to black.
                - `${className}` allows for optional additional classes passed from the parent component to customize the styling.
            */}
            {text} {/* Renders the `text` passed as a prop */}
        </h2>
    );
}

export default Subtitle;

