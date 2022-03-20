import SameDropOff from "../components/SameDropOff"
import { useEffect, useState } from "react";
import DifferentDropOff from "../components/DifferentDropOff";

const Main = () => {

    const options = [
        {
            label: "Same drop-off",
            value: "same",
        },
        {
            label: "Different drop-off",
            value: "different",
        }
    ];

    const optionElement = (options.map((option) => (
        <option value={option.value}>{option.label}</option>
    )))

    const getInitialState = () => {
        const value = "same";
        return value;
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const [value, setValue] = useState(getInitialState);

    if (value == "same") {
        return (
            <div className="app">
                <h2 className="title">Compare rental car deals to find the right one.</h2>
                <select className="drop-offs" onChange={handleChange}>
                    {optionElement}
                </select>
                <SameDropOff />
            </div>
        )
    } else {
        return (
            <div className="app">
                <h2 className="title">Compare rental car deals to find the right one.</h2>
                <select className="drop-offs" onChange={handleChange}>
                    {optionElement}
                </select>
                <DifferentDropOff />
            </div>
        )
    }
}

export default Main