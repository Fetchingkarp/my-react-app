import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import LogsPage from "./LogsPage";
import MissionsPage from "./MissionsPage";
import ChungusPage from "./ChungusPage";
import MysteriesPage from "./MysteriesPage";
import HelpPage from "./HelpPage";
import SecretPage from "./SecretPage";
import AdminLogsPage from "./AdminLogsPage";

import "./App.css";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="/missions" element={<MissionsPage />} />
      <Route path="/chungus" element={<ChungusPage />} />
      <Route path="/mysteries" element={<MysteriesPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/secret" element={<SecretPage />} />
      <Route path="/admin" element={<AdminLogsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;