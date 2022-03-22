import { FaSearch } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import "../stylesheets/SameDrop.css";
import { render } from 'react-dom';
import Modal from "./Modal"

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
        const autoComplete = (returnData.map((data) => (
            <option value={data.displayname}></option>
        )))
        render(autoComplete, document.getElementById("suggestions"))
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (event.target.drop.value.length === 0 || !event.target.drop.value) {
            document.getElementById("missing-data").style.display = "block"
        } else {
            document.getElementById("success").style.display = "block"
        }
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
            <div id="missing-data" className="response-modal">
                <Modal type={"error"} errorTitle={"An error occured by trying to perform your search"} errorMessage={"Please pick a pick up location"} />
            </div>
            <div id="success" className="response-modal">
                <Modal type={"success"} errorTitle={"Success!"} errorMessage={""} />
            </div>
        </>
    )
}
export default SameDropOff;