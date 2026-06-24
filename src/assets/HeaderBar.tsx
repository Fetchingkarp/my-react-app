import "./HeaderBar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const HeaderBar = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);

  // Restore scroll position
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("headerScroll");

    if (savedScroll && headerRef.current) {
      headerRef.current.scrollLeft = parseInt(savedScroll, 10);
    }
  }, []);

  // Save scroll position
  const handleScroll = () => {
    if (headerRef.current) {
      sessionStorage.setItem(
        "headerScroll",
        headerRef.current.scrollLeft
      );
    }
  };

  return (
    <div
      className="main-header"
      ref={headerRef}
      onScroll={handleScroll}
    >
      <button
        className="log-out-button"
        onClick={() => {
          localStorage.removeItem("userId");
          navigate("/");
        }}
      >
        Log Out
      </button>

      <button className="home-button" onClick={() => navigate("/main")}>
        Home
      </button>

      <button className="missions-button" onClick={() => navigate("/missions")}>
        Missions
      </button>

      <button className="chungus-button" onClick={() => navigate("/chungus")}>
        Chungus
      </button>

      <button className="mysteries-button" onClick={() => navigate("/mysteries")}>
        Mysteries
      </button>
      
      <button className="logs-button" onClick={() => navigate("/logs")}>
        Logs
      </button>

      <button className="help-button" onClick={() => navigate("/help")}>
        Help?
      </button>
    </div>
  );
};

export default HeaderBar;