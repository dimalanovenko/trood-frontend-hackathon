import * as React from "react";
import { PiCaretDownBold } from "react-icons/pi";

interface SelectProps {
    children: React.ReactNode;
    classSelect?: string;
    classDiv?: string;
    classCaret?: string;
    value: string;
    onChange: (value: string) => void;
}

const Selector = ({ children, classSelect = "", classDiv = '', classCaret = '', value, onChange }: SelectProps) => {
    return (
        <div className={`relative ${classDiv}`}>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${classSelect} appearance-none w-full border-2 border-border rounded-lg`}
            >
                {children}
            </select>

            <div className={`pointer-events-none absolute top-1/2 ${classCaret} -translate-y-1/2 text-black`}>
                <PiCaretDownBold className="w-4 h-4" />
            </div>
        </div>
    );
};

export default Selector;
