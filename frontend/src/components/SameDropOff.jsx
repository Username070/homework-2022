import { FaSearch } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import "../stylesheets/SameDrop.css";

const SameDropOff = () => {

    return (
        <div id="same-container">
            <div id="same-wrapper">
                <IoCarSport id="same-car" />
                <input id="same-input" />
            </div>
            <button type="submit" title="search-cars"><FaSearch /></button>
        </div>
    )
}
export default SameDropOff;