import './ChungusPage.css';
import { useEffect, useState } from 'react';
import HeaderBar from './assets/HeaderBar';
import { ChungusModal } from './assets/ChungusModal';

// type User = {
//   userId: string;
//   name: string;
//   points: number;
//   missions: Mission[];
//   logs: string[];
// };

// type Mission = {
//   title: string,
//   type: string,
//   description: string,
//   repeats: number,
//   points: number,
//   active: boolean,
// };


const ChungusPage = () => {
  const userId = localStorage.getItem("userId"); 
  const [reload, setReload] = useState<boolean>(false);

  // Chungus ownership
  const [chungus, setChungus] = useState<boolean>(false);
  const [resCode, setResCode] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [showChungusModal, setShowChungusModal] = useState<boolean>(false);

  useEffect(() => {
      const getChungus = async () => {
        try {
          const res = await fetch("https://classic-hospitality-mothers-bird.trycloudflare.com/api/points/chungus", {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'userId': `${userId}`,
            },
          })
          if (res.ok) {
            const data = await res.json();
            setChungus(data.owner);
          }
      } catch (err) {
        console.error(err);
      }
      }
      getChungus();
    }, [reload] );
  
  const kickChungus = async (e: React.FormEvent) => {
      e.preventDefault(); // prevents page reload
  
      const body = { userId }
      try {
        const res = await fetch("https://classic-hospitality-mothers-bird.trycloudflare.com/api/points/chungus", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body)
        })
        const data = await res.json();
        
        setResCode(data.res);
        setTime(data.time);

        setShowChungusModal(true);
      } catch (err) {
        console.error(err);
      }
    }

  return (
    <div className='chungus-page'>
      <HeaderBar/>
      <div className='chungus-container'>
        <div className={chungus ? "chungus-owned" : "chungus-not-owned"} onClick={(e) => {
          kickChungus(e);
          setReload(!reload);
          }}>
            <p className='chungus-text'>{chungus ? "you have the chungus" : "you don't have the gungus"}</p>
        </div>
      </div>

      {showChungusModal && <ChungusModal resCode={resCode} time={time} onClose={() => setShowChungusModal(false)}/>}
    </div>
  )
}

export default ChungusPage;