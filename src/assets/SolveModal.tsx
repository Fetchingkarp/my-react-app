import "./Modal.css";
export function SolveModal({ victim, killer, onClose }: { victim: string, killer: string, onClose: () => void }) {

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div 
        className="modal-content"
      >
        <h2>You solved the murder of {victim} by {killer}! </h2>
      </div>
    </div>
  );
}