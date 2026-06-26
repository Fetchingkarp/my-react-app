import './MysteriesPage.css';
import { useEffect, useState } from 'react';
import HeaderBar from './assets/HeaderBar';

type Mystery = {
  title: string,
  description: string,
};


const MysteriesPage = () => {
  const [mysteries, setMysteries] = useState<Mystery[]>([]); 

  useEffect(() => {
    const getMysteries = async () => {
      try {
        const res = await fetch("https://classic-hospitality-mothers-bird.trycloudflare.com/api/mysteries", {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        })
        if (res.ok) {
          const data = await res.json();
          setMysteries(data.mysteries);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getMysteries();
  }, [] );

  return (
    <div className='mysteries-page'>
      <HeaderBar/>
      <div className='mysteries-container'>
        {mysteries && mysteries.map((mystery: Mystery) => (
          <div key={mystery.title} className="mystery">
            <h2 className="mystery-title">{mystery.title}</h2>
            <p className="mystery-description">{mystery.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MysteriesPage;