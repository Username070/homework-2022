import "../stylesheets/App.css";

const Modal = ({ type, errorTitle, errorMessage }) => {

    function closeModal() {
        if (type === "success")
            document.getElementById("success").style.display = "none";
        else {
            document.getElementById("missing-data").style.display = "none";
        }
    }

    return (
        <div id="myModal" class="modal">
            <div class="modal-content">
                <button class="close" onClick={closeModal}>&times;</button>
                <p>{errorTitle}</p>
                <p>{errorMessage}</p>
            </div>

        </div>
    )
}
export default Modal;