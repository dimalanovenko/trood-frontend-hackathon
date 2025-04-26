import * as React from "react";
import { PiCaretDownBold } from "react-icons/pi"; // Importing an icon for the dropdown arrow

interface SelectProps {
    children: React.ReactNode; // The options of the select element (the children will be option tags)
    classSelect?: string; // Optional custom class for the select element
    classDiv?: string; // Optional custom class for the outer div container
    classCaret?: string; // Optional custom class for the caret (dropdown arrow)
    value: string | undefined; // The current value of the select element
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // The function to handle change events when an option is selected
}

const Selector = ({ children, classSelect = "", classDiv = '', classCaret = '', value, onChange }: SelectProps) => {
    return (
        <div className={`relative h-15.25 ${classDiv}`}>
            {/* Outer div with relative positioning to position the caret icon */}
            <select
                value={value} // The selected value of the dropdown
                onChange={onChange} // Event handler for when a new option is selected
                className={`${classSelect} appearance-none w-full border-2 border-border rounded-lg h-15.25`}
                // `appearance-none` removes the default select arrow styling provided by the browser
                // `w-full` makes the select element take up 100% of its parent container's width
                // `border-2 border-border` applies a border to the select element
                // `rounded-lg` rounds the corners of the select element
                // `h-15.25` sets the height of the select element
            >
                {children} {/* Renders the options passed as children */}
            </select>

            <div className={`pointer-events-none absolute top-1/2 ${classCaret} -translate-y-1/2 text-black`}>
                {/* The caret icon is absolutely positioned within the container */}
                {/* `pointer-events-none` ensures the icon doesn't interfere with clicks on the select element */}
                {/* `absolute` places the caret icon in a specific position relative to the div */}
                {/* `top-1/2` and `-translate-y-1/2` vertically center the icon */}
                {/* `text-black` ensures the caret icon has black color */}
                <PiCaretDownBold className="w-4 h-4" />
                {/* The PiCaretDownBold icon is styled with width and height of 4 units */}
            </div>
        </div>
    );
};

export default Selector;
