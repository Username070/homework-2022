import { FaSearch } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import "../stylesheets/SameDrop.css";
import { useEffect } from "react";
import { render } from 'react-dom';

const SameDropOff = () => {

    const getInputValue = (event) => {
        const userValue = event.target.value;
        sendRequest(userValue)
    };

    const sendRequest = async function (userValue) {

        const data = {
            text: userValue
        }

        const response = await fetch("http://localhost:3001/autocomplete", {
            body: JSON.stringify(data),
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                "JSONData": JSON.stringify(data)
            }
        });
        const returnData = await response.json();
        generateAutocomplete(returnData)
    }

    const generateAutocomplete = function (returnData) {
        console.log(returnData)
        const autoComplete = (returnData.map((data) => (
            <option value={data.displayname}></option>
        )))
        render(autoComplete, document.getElementById("suggestions"))
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div id="same-container">
                <form onSubmit={onSubmit}>
                    <div id="same-wrapper">
                        <IoCarSport id="same-car" />
                        <input name="drop" type="text" id="same-input" list="suggestions" onChange={getInputValue} autoComplete="off" />
                        <datalist id="suggestions">
                        </datalist>
                    </div>
                    <button type="submit" title="search-cars"><FaSearch /></button>
                </form>
            </div>
        </>
    )
}
export default SameDropOff;