import './LogsPage.css';
import { useEffect, useState } from 'react';
import HeaderBar from './assets/HeaderBar';

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


const LogsPage = () => {
  const userId = localStorage.getItem("userId"); 

  const [user, setUser] = useState<User>();

  useEffect(() => {
      const getUser = async () => {
        try {
          const res = await fetch("https://openings-sauce-shopper-cam.trycloudflare.com/api/user", {
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
    }, [] );

  return (
    <div className='logs-page'>
      <HeaderBar/>
      <div className='logs-container'>
        {user && user.logs.map((log: string) => (
          <div key={log} className="log">
            <p className="log-text">{log}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogsPage;