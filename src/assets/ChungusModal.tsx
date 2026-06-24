import './Modal.css'

export function ChungusModal({ resCode, time, onClose, }: { resCode: string, time: string, onClose: () => void }) {
    
  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div 
        className="modal-content"
      >
        {resCode === "own" && <h2 className='modal-text'>You took the chungus! </h2>}
        {resCode === "ok" && <h2 className='modal-text'>You farmed the chungus! </h2>}
        {resCode === "no" && <h2 className='modal-text'>You must wait {time} seconds until you can kick the chungus! </h2>}
      </div>
    </div>
  );
}