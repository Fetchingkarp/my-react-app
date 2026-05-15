import "./Modal.css";
export function MissionCompleteModal({ missionName, repeats, onClose }: { missionName: string, repeats: number, onClose: () => void }) {

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div 
        className="modal-content"
      >
        <h2>You completed {missionName}! This mission can be completed {repeats - 1} more times</h2>
      </div>
    </div>
  );
}