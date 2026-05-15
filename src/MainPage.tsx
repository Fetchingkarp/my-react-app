import React, { useEffect, useState } from "react";
import "./MainPage.css";
import gun from "./assets/gun.jpg";
import { useNavigate } from "react-router-dom";
import HeaderBar from "./assets/HeaderBar";

import "./assets/KillModal";
import { KillModal } from "./assets/KillModal";
import { SolveModal } from "./assets/SolveModal";
import { MissionCompleteModal } from "./assets/MissionCompleteModal";

type User = {
  userId: string;
  name: string;
  points: number;
  missions: Mission[];
  logs: [];
};

type Mission = {
  title: string,
  type: string,
  description: string,
  repeats: number,
  points: number,
  active: boolean,
};


// Props: userId
const MainPage = () => {
  const navigate = useNavigate();

  const [reload, setReload] = useState<boolean>(true);

  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState<User | undefined>(undefined);
  const [users, setUsers] = useState<User[]>([]);

  // Kill
  const [selectedUser, setSelectedUser] = useState<string>();
  // Solve
  const [selectedVictim, setSelectedVictim] = useState<string>();
  const [selectedKiller, setSelectedKiller] = useState<string>();

  // Missions
  const [completedMissionName, setCompletedMissionName] = useState<string>();
  const [completedMissionRepeats, setcompletedMissionRepeats] = useState<number>();
  // Modals
  const [showKillConfirm, setShowKillConfirm] = useState<boolean>(false);
  const [showSolveConfirm, setShowSolveConfirm] = useState<boolean>(false);
  const [showMissionConfirm, setShowMissionConfirm] = useState<boolean>(false);


  // KILL FUNCTION
  const kill = async(e: React.FormEvent) => {
    e?.preventDefault
    const body = { killerId: userId, targetName: selectedUser };
    try {
      const res = await fetch("http://192.168.0.206:5000/api/points/kill", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        const data = await res.json();
        console.log(data.targetName);
        setSelectedUser(data.targetName);
        setShowKillConfirm(true);
      }
      setReload(!reload);
    } catch (err) {
      console.error(err);
    }
  }

  // SOLVE FUNCTION
  const solve = async(e: React.FormEvent) => {
    e?.preventDefault
    const body = { detectiveId: userId, victimId: selectedVictim, killerId: selectedKiller };
    try {
      const res = await fetch("http://192.168.0.206:5000/api/points/solve", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        const data = await res.json();
        console.log(data.targetName);
        setSelectedUser(data.targetName);
        setShowSolveConfirm(true);
      }
      setReload(!reload);
    } catch (err) {
      console.error(err);
    }
  }

  // MISSION COMPLETE
  const completeMission = async(completedMissionName: string, e: React.FormEvent) => {
    e?.preventDefault
    const body = { userId, completedMissionName };
    try {
      const res = await fetch("http://192.168.0.206:5000/api/points/missions/complete", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        const data = await res.json();
        console.log(data.targetName);
        setShowMissionConfirm(true);
      }
      setReload(!reload);
    } catch (err) {
      console.error(err);
    }
  }

  // Get user + other users
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://192.168.0.206:5000/api/user", {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'userId': `${userId}`,
          },
        })
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setUser(data);
        }
    } catch (err) {
      console.error(err);
    }
    }
    getUser();

    // Get all users
    fetch("http://192.168.0.206:5000/api/users") // 🔁 change to your API URL
      .then((res) => res.json())
      .then((data) => {
        const usersArray: User[] = Object.entries(data).map(
          ([id, value]: any) => ({
            id: id,
            userId: value.userId,
            name: value.name,
            points: value.points,
            missions: value.missions,
            logs: value.logs,
          })
        );
        setUsers(usersArray);
      })
      .catch((err) => console.error("Error fetching users:", err));

  }, [reload]);

  // UseEffect

  return (
    <div className="main-page">
      <HeaderBar/>
      {user && <h1 className="user-name-header">Welcome, <b>{user.name}</b></h1>}
      {user && <h1 className="points-header">{user.points}</h1>}

      {/* Kill section */}
      <div className="kill">
        <button className="kill-button" onClick={kill}>KILL</button>
          {/* Dropdown */}
          <select
            value={selectedUser ?? ""}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="kill-select"
          >
            <option value="">Kill?</option>
            {users.filter((u) => u.userId !== user?.userId).map((u) => (
              <option key={u.userId} value={u.userId}>
                {u.name}
              </option>
            ))}
          </select>
      </div>

      {/* Solve section */}
      <div className="solve">
        <button className="solve-button" onClick={solve}>SOLVE</button>
          {/* Dropdown */}
          <div className="solve-select">
            <select
              value={selectedVictim ?? ""}
              onChange={(e) => setSelectedVictim(e.target.value)}
              className="solve-victim-select"
            >
              <option value="">Victim</option>
              {users.filter((u) => u.userId !== user?.userId).map((u) => (
                <option key={u.userId} value={u.userId}>
                  {u.name}
                </option>
              ))}
            </select>
            <select
              value={selectedKiller ?? ""}
              onChange={(e) => setSelectedKiller(e.target.value)}
              className="solve-killer-select"
            >
              <option value="">Whodidit</option>
              {users.filter((u) => u.userId !== user?.userId).map((u) => (
                <option key={u.userId} value={u.userId}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
      </div>

      <p className="missions-header">MISSIONS</p>
      <div className="missions">
        {user && user.missions.filter((m) => m.active === true).map((mission: Mission) => (
          <button key={mission.title} className="unlimited-mission">
            <b className="mission-title">{mission.title} ({mission.points})</b>
            <p className="mission-description">{mission.description}</p>
            <p className="mission-repeats">{mission.repeats} repeat(s)</p>
            <button className="mission-complete-button" onClick={(e) => {
              completeMission(mission.title, e);
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

      {showKillConfirm && <KillModal name={selectedUser ?? "no"} onClose={() => setShowKillConfirm(false)}></KillModal>}
      {showSolveConfirm && <SolveModal victim={users.find((u) => u.userId === selectedVictim)?.name ?? "no"} 
        killer={users.find((u) => u.userId === selectedKiller)?.name ?? "no"} onClose={() => setShowSolveConfirm(false)}></SolveModal>}
      {showMissionConfirm && <MissionCompleteModal missionName={completedMissionName ?? "no"} repeats={completedMissionRepeats ?? 1} onClose={() => setShowMissionConfirm(false)}></MissionCompleteModal>}
    </div>
  )
}

export default MainPage;