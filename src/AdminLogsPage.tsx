import './AdminLogsPage.css';
import { useEffect, useState } from 'react';

type SecretLog = {
  message: string,
  timestamp: string
}

const AdminLogsPage = () => {
  const [logs, setLogs] = useState<SecretLog[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
      const getAdminLogs = async () => {
        try {
          const res = await fetch("https://openings-sauce-shopper-cam.trycloudflare.com/api/secret/logs", {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          })
          if (res.ok) {
            const data = await res.json();
            setLogs(data.secretLogs);
          }
      } catch (err) {
        console.error(err);
      }
      }
      getAdminLogs();
    }, [reload] );

  return (
    <div className='secret-logs-page'>
      <button onClick={() => setReload(!reload)}>Reload</button>
      <div className='secret-logs-container'>
        {logs && logs.map((log: SecretLog) => (
          <div key={log.message} className="log">
            <p>{log.message} at {log.timestamp} </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminLogsPage;