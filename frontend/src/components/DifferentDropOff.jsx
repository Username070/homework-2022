import { FaSearch } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import "../stylesheets/DifferentDrop.css";

const DifferentDropOff = () => {
    return (
        <div id="different-container">
            <form>
                <div id="different-global-wrapper">
                    <div className="different-wrapper" id="different-wrapper-1">
                        <IoCarSport className="different-car" />
                        <input className="different-input" id="different-1" />
                    </div>
                    <div className="different-wrapper" id="different-wrapper-2">
                        <IoCarSport className="different-car" />
                        <input className="different-input" id="different-2" />
                    </div>
                </div>
                <button type="submit" title="search-cars"><FaSearch /></button>
            </form>
        </div>
    )
}
export default DifferentDropOff;