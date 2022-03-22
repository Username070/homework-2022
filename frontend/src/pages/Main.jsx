import SameDropOff from "../components/SameDropOff"
import { useState } from "react";
import DifferentDropOff from "../components/DifferentDropOff";

const Main = () => {

    const options = [ // Options that will be displayed in a select input
        {
            label: "Same drop-off",
            value: "same",
        },
        {
            label: "Different drop-off",
            value: "different",
        }
    ];

    const optionElement = (options.map((option) => ( // Mapping options into element
        <option value={option.value}>{option.label}</option>
    )))

    const getInitialState = () => { // Default value
        const value = "same";
        return value;
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const [value, setValue] = useState(getInitialState);

    if (value == "same") { // Conditional rendering, specifies what component to show on selected value from select element
        return (<>
            <h2 className="title">Compare rental car deals to find the right one.</h2>
            <select className="drop-offs" onChange={handleChange}>
                {optionElement}
            </select>
            <SameDropOff />
        </>
        )
    } else {
        return (
            <>
                <h2 className="title">Compare rental car deals to find the right one.</h2>
                <select className="drop-offs" onChange={handleChange}>
                    {optionElement}
                </select>
                <DifferentDropOff />
            </>
        )
    }
}

export default Main