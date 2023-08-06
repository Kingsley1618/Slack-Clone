import React from 'react';
import './style.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './auth/login';
import Team from './profile/first';
import Channel from './profile/third';
import Personal from './profile/second';
import Slack from "./slack/slack";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setup-team" element={<Team />} />
        <Route path="/setup-personal" element={<Personal />} />
        <Route path="/setup-channels" element={<Channel />} />
        <Route path="/setup-slack" element={<Slack />} />
      </Routes>
    </div>
  );
}
