import './MissionsPage.css';
import { useEffect, useState } from 'react';
import HeaderBar from './assets/HeaderBar';

import { MissionCompleteModal } from './assets/MissionCompleteModal';
import { ConfirmModal } from './assets/ConfirmModal';

type User = {
  userId: string;
  name: string;
  points: number;
  missions: Mission[];
  logs: string[];
};

type Mission = {
  title: string,
  type: string,
  description: string,
  repeats: number,
  points: number,
  active: boolean,
};


const MissionsPage = () => {
  const userId = localStorage.getItem("userId"); 

  const [reload, setReload] = useState<boolean>(true);

  const [user, setUser] = useState<User>();

  const [completedMissionName, setCompletedMissionName] = useState<string>();
  const [completedMissionRepeats, setcompletedMissionRepeats] = useState<number>();
  // Modal
  const [showMissionConfirm, setShowMissionConfirm] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  useEffect(() => {
      const getUser = async () => {
        try {
          const res = await fetch("https://extraordinary-elected-basement-polo.trycloudflare.com/api/user", {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'userId': `${userId}`,
            },
          })
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          }
      } catch (err) {
        console.error(err);
      }
      }
      getUser();
    }, [reload] );

  // MISSION COMPLETE
  const completeMission = async(completedMissionName: string) => {
    const body = { userId, completedMissionName };
    try {
      const res = await fetch("https://extraordinary-elected-basement-polo.trycloudflare.com/api/points/missions/complete", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        await res.json();
        setShowMissionConfirm(true);
      }
      setReload(!reload);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='missions-page'>
      <HeaderBar/>
      {/* {user && <h1 className="points-header">{user.points}</h1>} */}
      <p className="missions-header">MISSIONS</p>
      <div className="missions">
        {user && user.missions.filter((m) => m.active === true).map((mission: Mission) => (
          <button key={mission.title} className="unlimited-mission">
            <b className="mission-title">{mission.title} ({mission.points})</b>
            <p className="mission-description">{mission.description}</p>
            <p className="mission-repeats">{mission.repeats} repeat(s)</p>
            <button className="mission-complete-button" onClick={() => {
              setShowConfirmModal(true);
              setCompletedMissionName(mission.title);
              setcompletedMissionRepeats(mission.repeats);
            }}>Complete!</button>
          </button>
        ))}
        {user && user.missions.filter((m) => m.active === false).map((mission: Mission) => (
          <div key={mission.title} className="inactive-mission">
            <b className="mission-title">{mission.title} ({mission.points})</b>
            <p className="mission-description">{mission.description}</p>
          </div>
        ))}

      </div>
      {showMissionConfirm && <MissionCompleteModal missionName={completedMissionName ?? "no"} repeats={completedMissionRepeats ?? 1} onClose={() => setShowMissionConfirm(false)}></MissionCompleteModal>}
      {showConfirmModal && <ConfirmModal message={`Confirm completion of ${completedMissionName}`} onClose={() => setShowConfirmModal(false)} confirm={() => completeMission(completedMissionName ?? "no")}></ConfirmModal>}
    </div>
  )
}

export default MissionsPage;