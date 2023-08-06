import React from 'react';
import { useState } from 'react';
import './second.css';
function Personal() {
  const [val, setVal] = useState();
  return (
    <div className="">
      <div className="team-header"></div>

      <div className="main-div">
        <div className="left-div">
          <h5 className="team-name">{name}</h5>
<div className="">
          <div className="ps-3 pt-1" style = {{color : "rgba(255,255,255,0.72)"}}>Direct messages</div>
         
          <div className="ps-2 d-flex mt-1" style = {{alignItems:"center"}}> <img src="nft.jpg" className="personal-small-image" alt="upload" />
          <div className="personal-name px-2" style = {{color:"rgba(255,255,255,0.8)"}}>
{val}
            </div>
            <div className="ps-1" style = {{color:"rgba(255,255,255,0.4)"}}>
you
            </div>
           
          </div>
          </div>
        </div>

        <div className="right-div px-5 pt-4">
          <div style={{ fontSize: '13px' }}>Step 2 of 4</div>

          <h1 className="fw-bold pt-3">What’s your name?</h1>
          <div>
            Adding your name and profile photo helps your teammates recognize
            and connect with you more easily.
          </div>

          <input
            type="text"
            onChange={(event) => {
              setVal(event.target.value);
            }}
            placeholder="Enter your full name"
            className="form-control w-100 mt-4 fs-5"
          />

          <div className="mt-5">
            <h6>Your profile photo(optional)</h6>

            <div className="d-flex">
              <img src="nft.jpg" className="personal-image" alt="upload" />

              <div className="ps-3">
                <div>
                  Help your teammates know they’re talking to the right person.
                </div>
                <button type="button" className="btn border border-2 mt-3 fw-bold">
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          <button className="button-next btn">Next</button>
        </div>
      </div>
    </div>
  );
}
export default Personal;
