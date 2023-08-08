import React from 'react';
import { useState, useContext } from 'react';
import './first.css';
import { UserContext } from '../context';
function Team() {
  const [name, setName] = useState();
  const { team, setTeam } = useContext(UserContext);
  function teamName() {
    setTeam(name);
  }
  return (
    <div className="">
      <div className="team-header"></div>

      <div className="main-div">
        <div className="left-div">
          <h5 className="team-name">{name}</h5>
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
              setName(event.target.value);
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
