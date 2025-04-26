import * as React from "react";

interface PageContainerProps {
    children: React.ReactNode; // The content to be rendered inside the container (children elements)
    className?: string; // Optional className for additional styling
}

const PageContainer = ({ children, className }: PageContainerProps) => {
    return (
        <div className={`bg-bg min-h-screen w-6/7 rounded-tl-2xl top-28.5 left-1/7 pr-15 pl-16.5 pt-15.25 z-49 ${className}`}>
            {/* The div applies several styles including background color, minimum height, width, and positioning.
                - `bg-bg`: background color custom class
                - `min-h-screen`: ensures the container takes at least the full height of the screen
                - `w-6/7`: sets the container width to 6/7 of the screen width
                - `rounded-tl-2xl`: applies a large top-left border radius
                - `top-28.5 left-1/7`: positions the container relative to the screen using the `top` and `left` values
                - `pr-15 pl-16.5 pt-15.25`: padding values for the right, left, and top
                - `z-49`: z-index to layer the container above other elements */}
            {children} {/* Renders the passed children inside the container */}
        </div>
    );
}

export default PageContainer;
