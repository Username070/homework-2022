import { useCallback, useEffect } from "react";
import { FaSearch } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import "../stylesheets/SameDrop.css";
import { render } from "react-dom";
import Modal from "./Modal"
import debounce from "lodash.debounce";

const SameDropOff = () => {

    const getInputValue = (event) => { // Gets called every time user inputs new character (debounce 350ms)
        const userValue = event.target.value;
        sendRequest(userValue) // Passes data to function
    };

    const debouncedGetInputValue = useCallback(
        debounce(getInputValue, 350)
        , []);

    useEffect(() => {
        return () => {
            debouncedGetInputValue.cancel();
        }
    }, []);

    const sendRequest = async function (userValue) {

        const data = {
            query: userValue
        }

        const response = await fetch("http://localhost:3001/autocomplete", { // Making request to api endpoint
            body: JSON.stringify(data),
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "JSONData": JSON.stringify(data)
            }
        });
        const returnData = await response.json();
        generateAutocomplete(returnData) // On returned data, pass to generate autocompletion
    }

    const generateAutocomplete = function (returnData) {
        const autoComplete = (returnData.map((data) => ( // Mapping data into element
            <option value={data.displayname}>{data.country}</option>
        )))
        render(autoComplete, document.getElementById("suggestions")) // Rendering element
    }

    const onSubmit = (event) => {
        event.preventDefault(); // Don't change url / refresh page

        if (event.target.drop.value.length === 0 || !event.target.drop.value) {
            document.getElementById("missing-data").style.display = "block" // If input value is empty
        } else {
            document.getElementById("success").style.display = "block" // If input values are filled
        }
    }

    return (
        <>
            <div className="parent-single">
                <form onSubmit={onSubmit}>
                    <div className="div1-single">
                    <IoCarSport className="car-single" />
                        <input name="drop" type="text" className="input-single" list="suggestions" onChange={debouncedGetInputValue} autoComplete="off" />
                        <datalist id="suggestions">
                        </datalist>
                    </div>
                    <div className="div2-single">
                        <button type="submit" title="search-cars" id="search"><FaSearch /></button>
                    </div>
                </form>
            </div>
            <div id="missing-data" className="response-modal">
                <Modal type={"error"} title={"An error occured by trying to perform your search"} message={"Please pick a pick up location"} />
            </div>
            <div id="success" className="response-modal">
                <Modal type={"success"} title={"Success!"} message={""} />
            </div>
        </>
    )
}
export default SameDropOff;