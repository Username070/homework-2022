import { FaSearch } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import "../stylesheets/DifferentDrop.css";
import { render } from 'react-dom';
import Modal from "./Modal"

const DifferentDropOff = () => {

    let inputBox = ""

    const getInputValue = (event) => {
        const userValue = event.target.value;
        inputBox = event.target.id
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
            <div id="different-container">
                <form onSubmit={onSubmit}>
                    <div id="different-global-wrapper">
                        <div className="different-wrapper" id="different-wrapper-1">
                            <IoCarSport className="different-car" />
                            <input name="dfDrop1" className="different-input" id="different-1" list="dfSuggestions1" onChange={getInputValue}/>
                            <datalist id="dfSuggestions1">
                            </datalist>
                        </div>
                        <div className="different-wrapper" id="different-wrapper-2">
                            <IoCarSport className="different-car" />
                            <input name="dfDrop2" className="different-input" id="different-2" list="dfSuggestions2" onChange={getInputValue}/>
                            <datalist id="dfSuggestions2">
                            </datalist>
                        </div>
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
export default DifferentDropOff;