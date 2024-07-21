import React from "react";
import { Routes, Route } from 'react-router-dom';
import Homepage from "./Homepage";
import Signup from "./signup";
import LoginPage from "./Login";
import Forgot from "./forgot";
import SetPassword from "./SetPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/changepassword" element={<SetPassword/>} />
      </Routes>
    </div>
  );
}

export default App;

