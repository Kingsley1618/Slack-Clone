import React from 'react';
import './style.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './auth/login';
import { UserContext } from './context.js';
import Team from './profile/first';
import Channel from './profile/third';
import Personal from './profile/second';
import Slack from './slack/slack';
import { useState } from 'react';
export default function App() {
  const [inputVal, setInputVal] = useState();
  const [teamname, setTeamname] = useState();
  return (
    <UserContext.Provider
      value={{ inputVal, setInputVal, teamname, setTeamname }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/setup-team" element={<Team />} />
          <Route path="/setup-personal" element={<Personal />} />
          <Route path="/setup-channels" element={<Channel />} />
          <Route path="/setup-slack" element={<Slack />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}
