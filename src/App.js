import "./App.css";
import { Routes, Route } from "react-router-dom";

import Swipe from "./components/Swipe/Swipe";

import userData from "./data/mockDataLoggedUser.json";
import teachersData from "./data/mockDataTeachers.json";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Swipe userData={userData} teachersData={teachersData} />} />
      </Routes>
    </div>
  );
}

export default App;
