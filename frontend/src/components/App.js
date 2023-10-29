import React from "react";
import Login from "./login";
import Registration from "./registration";
import Home from "./home";
import Admin from "./admin";
import Dashboard from "./dashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function renderConditionally(){

}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;