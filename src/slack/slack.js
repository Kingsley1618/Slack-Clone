import React from 'react';
import { useState } from 'react';
import './slack.css';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
function Slack() {
  const [channel, setChannel] = useState();
  return (
    <div className="">
      <div className="slack-header">
        <div className="left-nav"></div>

        <div className="center-nav">
          <AiOutlineClockCircle className="clock" />
          <div className="search-div">
            <input type="text" className="nav-input" value = "Search kings"/>
            <AiOutlineSearch className="search" />
          </div>
        </div>

        <div className="right-nav">
          <AiOutlineQuestionCircle className="circle" />
          <img src="nft.jpg" className="profile-img" />
        </div>
      </div>

      <div className="main-div">
        <div className="left-div"></div>

        <div className="right-div px-5 pt-4"></div>
      </div>
    </div>
  );
}
export default Slack;
