import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import knife from './assets/knife.png'
import './App.css'

function App() {
  const [count, setCount,] = useState(0);
  const [message, setMessage,] = useState("nothing yet");
  const handleClick = async () => {
  try {
    const res = await fetch("http://192.168.0.206:5000/api/hello");
    const data = await res.json();
    setMessage(data.message);
  } catch (err) {
    console.error(err);
    setMessage("Error contacting backend");
  }
  };

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents page reload

    console.log("Name:", name);
    console.log("Password:", password);
    const body = { name, password, }

    try {
      const res = await fetch("http://192.168.0.206:5000/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      const data = await res.json();
      console.log(data);
      setMessage("User registered successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to register user");
    }
  };
  
  const [loginName, setLoginName] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents page reload

    console.log("Name:", loginName);
    console.log("Password:", loginPassword);
    const body = { loginName, loginPassword, }
    try {
      const res = await fetch("http://192.168.0.206:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      const data = await res.json();
      console.log(data);
      setMessage("User logged in successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to login user");
    }
  }

  // MAIN PAGE STARTS HERE
  return (
    <>
      <header>
        <button onClick={handleClick} style={{ marginTop: "20px" }}>
          Click Me
        </button>
        <p>{message}</p>
      </header>
      <section id="center">
        <div className="hero">
          <img src={knife} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="register">
        <div id="docs">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Enter name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>

        <div>
          <input
            placeholder="Enter password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <h2>Log In</h2>
          <form onSubmit={handleLoginSubmit}>
        <div>
          <input
            placeholder="Enter name"
            value={loginName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoginName(e.target.value)
            }
          />
        </div>

        <div>
          <input
            placeholder="Enter password"
            value={loginPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoginPassword(e.target.value)
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
