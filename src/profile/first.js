import React from 'react';
import { useState, useContext, useEffect } from 'react';
import './first.css';
import { auth, db } from '../firebase';
import { UserContext } from '../context';
import { useNavigate } from 'react-router-dom';
function Team() {
  const navigate = useNavigate();
  const { teamname, setTeamname } = useContext(UserContext);
  function teamName(event) {
    db.collection('users')?.doc(auth.currentUser.uid).update({ teamname });
    navigate("/setup-personal")
  }
  function onChangeHandler(event) {
    setTeamname(event.target.value);
    localStorage.setItem("inputValue", event.target.value);
  }

  useEffect(() => {
    setTeamname(localStorage.getItem("inputValue"));
  }, []);
  return (
    <div className="">
      <div className="team-header"></div>

      <div className="main-div">
        <div className="left-div">
          <h5 className="team-name">{teamname}</h5>
        </div>

        <div className="right-div px-5 pt-4">
          <div style={{ fontSize: '13px' }}>Step 1 of 2</div>

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
            onChange={onChangeHandler}
            value = {teamname}
            placeholder="Ex: Acme Marketing or Acme Co"
            className="form-control w-100 mt-4 fs-5"
            maxlength="10"
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
