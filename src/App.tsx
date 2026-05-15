import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import LogsPage from "./LogsPage";

import "./App.css";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;