import React from 'react';
import { useState, useContext } from 'react';
import './first.css';
import { auth, db } from '../firebase';
import { UserContext } from '../context';
function Team() {

  const { teamname, setTeamname } = useContext(UserContext);
  function teamName() {
    db.collection("users")?.add({teamname})
  }
  return (
    <div className="">
      <div className="team-header"></div>

      <div className="main-div">
        <div className="left-div">
          <h5 className="team-name">{teamname}</h5>
        </div>

        <div className="right-div px-5 pt-4">
          <div style={{ fontSize: '13px' }}>Step 1 of 4</div>

          <h1 className="fw-bold pt-3">
            What’s the name of your <br />
            company or team?
          </h1>
          <div>
            This will be the name of your Slack workspace — choose something
            that your team will recognize.
          </div>

          <input
            type="text"
            onChange={(event) => {
              setTeamname(event.target.value);
            }}
            placeholder="Ex: Acme Marketing or Acme Co"
            className="form-control w-100 mt-4 fs-5"
          />

          <button className="button-next btn" onClick={teamName}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default Team;
