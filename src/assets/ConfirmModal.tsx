import "./Modal.css";
import "./ConfirmModal.css"
export function ConfirmModal({ message, onClose, confirm }: { message: string, onClose: () => void, confirm: () => void }) {

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div 
        className="modal-content"
      >
        <h2 className="modal-text">{message} </h2>
        <button onClick={() => {
          confirm();
          onClose();
        }} className="confirm-button">Confirm</button>
      </div>
    </div>
  );
}