import { useCallback, useEffect } from "react";
import { FaSearch } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import "../stylesheets/DifferentDrop.css";
import { render } from "react-dom";
import Modal from "./Modal"
import debounce from "lodash.debounce";

const DifferentDropOff = () => {

    let inputBox = ""

    const getInputValue = (event) => {
        const userValue = event.target.value;

        inputBox = event.target.id // Get id of what input box is currently selected
        sendRequest(userValue)
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

        const response = await fetch("http://localhost:3001/autocomplete", {
            body: JSON.stringify(data),
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "JSONData": JSON.stringify(data)
            }
        });
        const returnData = await response.json();
        generateAutocomplete(returnData)
    }

    const generateAutocomplete = function (returnData) {
        const autoComplete = (returnData.map((data) => (
            <option key={data.id} value={data.displayname}>{data.country}</option>
        )))
        if (inputBox === "different-1") {
            render(autoComplete, document.getElementById("dfSuggestions1"))
        } else {
            render(autoComplete, document.getElementById("dfSuggestions2"))
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (event.target.dfDrop1.value.length === 0 ||
            event.target.dfDrop2.value.length === 0 ||
            !event.target.dfDrop1.value ||
            !event.target.dfDrop2.value) {
            document.getElementById("missing-data").style.display = "block"
        } else {
            document.getElementById("success").style.display = "block"
        }
    }

    return (
        <>
            <div className="parent-double">
                <form onSubmit={onSubmit}>
                    <div className="div1-double">
                    <IoCarSport className="car-double" />
                        <input name="dfDrop1" className="input-double" id="different-1" list="dfSuggestions1" onChange={getInputValue} autoComplete="off"/>
                        <datalist id="dfSuggestions1">
                        </datalist>
                    </div>
                    <div className="div2-double">
                    <IoCarSport className="car-double" />
                        <input name="dfDrop2" className="input-double" id="different-2" list="dfSuggestions2" onChange={getInputValue} autoComplete="off"/>
                        <datalist id="dfSuggestions2">
                        </datalist>
                    </div>
                    <div className="div3-double">
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
export default DifferentDropOff;