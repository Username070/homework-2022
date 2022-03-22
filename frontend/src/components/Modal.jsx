import "../stylesheets/Modal.css";

const Modal = ({ type, title, message }) => {

    function closeModal() { // Chooses a currently displayed modal to close
        if (type === "success")
            document.getElementById("success").style.display = "none";
        else {
            document.getElementById("missing-data").style.display = "none";
        }
    }

    return ( // Modal that is used to display correct / missing data message
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <p className="modal-title">{title}</p>
                <p className="modal-message">{message}</p>
                <button className="dismiss" onClick={closeModal}>Dismiss</button>
            </div>
        </div>
    )
}
export default Modal;