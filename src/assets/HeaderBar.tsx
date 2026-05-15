import "./HeaderBar.css"
import { useNavigate } from "react-router-dom";

const HeaderBar = () => {
    const navigate = useNavigate();
    return (
      <div className="main-header">
        <button className="log-out-button" onClick={() =>{
          localStorage.removeItem("userId");
          navigate("/");
          }}>Log Out</button>

        <button className="home-button" onClick={() => navigate("/main")}>
          Home
        </button>

        <button className="logs-button" onClick={() => navigate("/logs")}>
          Logs
        </button>
      </div>
    
    )
}

export default HeaderBar;