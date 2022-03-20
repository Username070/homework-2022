import { FaSearch } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import "../stylesheets/SameDrop.css";
import { useEffect } from "react";
// fetch("http://localhost:3001/autocomplete")
// .then(response => response.json())
// .then(data => console.log(data));


// For testing purposes
// setTimeout(() => {test()}, 2000)
// test()
// async function test() {
//     let data = {
//         text: "Koreguoju su Jonu"
//     };

//     const response = await fetch('http://localhost:5000/api/goals/62270aff819938fa6311ba51', {
//         method: 'delete',
//         body: JSON.stringify(data),
//         headers: {
//             'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjcwMDc4NDliMGE4MTUyMzdlNjcyZCIsImlhdCI6MTY0NjcyMzE5MiwiZXhwIjoxNjQ5MzE1MTkyfQ.d8RO-9qqB_vG3CPUMM1AfDr-S6lF_MmGxCUA7qXeak8',
//             'Content-Type': 'application/json'
//         }
//     });
//     const returnData = await response.json();

//     console.log(returnData);
// }


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

        console.log(returnData)
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div id="same-container">
            <form onSubmit={onSubmit}>
                <div id="same-wrapper">
                    <IoCarSport id="same-car" />
                    <input type="text" id="same-input" onChange={getInputValue} />
                </div>
                <button type="submit" title="search-cars"><FaSearch /></button>
            </form>
        </div>
    )
}
export default SameDropOff;