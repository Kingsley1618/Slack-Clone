import React from 'react';
import { useState } from 'react';
import './third.css';
function Channel() {
  const [channel, setChannel] = useState();
  return (
    <div className="">
      <div className="team-header"></div>

      <div className="main-div">
        <div className="left-div">
          <h5 className="team-name">{name}</h5>
          <div className="">
            <div>
              <div
                className="ps-3 mb-2"
                style={{ color: 'rgba(255,255,255,0.72)' }}
              >
                Channels
              </div>
              <div className="channel-name"># {channel}</div>
            </div>
            <div
              className="ps-3 pt-1"
              style={{ color: 'rgba(255,255,255,0.72)' }}
            >
              Direct messages
            </div>

            <div className="ps-2 d-flex mt-1" style={{ alignItems: 'center' }}>
              {' '}
              <img
                src="nft.jpg"
                className="personal-small-image"
                alt="upload"
              />
              <div
                className="personal-name px-2"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              ></div>
              <div className="ps-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                you
              </div>
            </div>
          </div>
        </div>

        <div className="right-div px-5 pt-4">
          <div style={{ fontSize: '13px' }}>Step 3 of 4</div>

          <h1 className="fw-bold pt-3" style={{ fontSize: '45px' }}>
            What’s your team working on <br />
            right now?
          </h1>
          <div>
            This could be anything: a project, campaign, event, or the deal
            you’re trying to close.
          </div>

          <input
            type="text"
            onChange={(event) => {
              setChannel(event.target.value);
            }}
            placeholder="Ex:Q4 budget, autumn campaign"
            className="form-control w-100 mt-4 fs-5"
          />

          <button className="button-next btn">Next</button>
        </div>
      </div>
    </div>
  );
}
export default Channel;
