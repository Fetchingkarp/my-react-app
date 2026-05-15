import "./Modal.css";
export function KillModal({ name, onClose }: { name: string, onClose: () => void }) {

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div 
        className="modal-content"
      >
        <h2>{name} has been killed! </h2>
      </div>
    </div>
  );
}