import React from 'react';
import { useState, useContext } from 'react';
import './slack.css';
import { UserContext } from '../context';
import './slackTwo.css';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../store';
import { BsChatLeftDots } from 'react-icons/bs';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { AiOutlineSend } from 'react-icons/ai';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { BiSolidRightArrow } from 'react-icons/bi';
function Slack() {
  const [channel, setChannel] = useState();
  const { inputVal, setInputVal } = useContext(UserContext);
  const channelId = useSelector((state) => state.id);
  const [newChannel, error, loading] = useCollection(db.collection('rooms'));
  const [roomName, stop, waiting] = useDocument(
    channelId && db.collection('rooms').doc(channelId)
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  function toggleChannel() {
    setOpen((open) => !open);
  }

  function addChannel() {
    db.collection('rooms').add({ inputVal });
  }

  function selectChannel(id) {
    dispatch(UserActions.selectId({ id }));
  }
  return (
    <div className="">
      <div className="slack-header">
        <div className="left-nav"></div>

        <div className="center-nav">
          <AiOutlineClockCircle className="clock" />
          <div className="search-div">
            <input type="text" className="nav-input" value="Search kings" />
            <AiOutlineSearch className="search" />
          </div>
        </div>

        <div className="right-nav">
          <AiOutlineQuestionCircle className="circle" />
          <img src="nft.jpg" className="profile-img" />
        </div>
      </div>

      <div className="main-div">
        <div className="left-div">
          <div className="left-header">
            <div className="text-white fw-bold">kings</div>

            <div className="note">
              <PiNotePencilDuotone />
            </div>
          </div>

          <div className="channel-header d-flex ms-4">
            <BiSolidRightArrow
              className="arrow-right"
              onClick={toggleChannel}
            />
            <div className="channels-title" onClick={toggleChannel}>
              Channels
            </div>
          </div>
          <div className="channel d-flex">
            <div className="hash text-white">#</div>
            <div className="channel-name">general</div>
          </div>

          {newChannel?.docs.map((doc) => {
            return (
              open && (
                <div
                  className="channel d-flex"
                  onClick={() => {
                    selectChannel(doc.id);
                  }}
                >
                  <div className="hash text-white pe-3">#</div>
                  <div className="channel">{doc.data().inputVal}</div>
                </div>
              )
            );
          })}

          <div className="test">
            <input
              type="text"
              maxlength="8"
              className="channel-input"
              placeholder="Name of Channel"
              onChange={(event) => {
                setInputVal(event.target.value);
              }}
            />

            <div>
              <button
                type="button"
                className="btn text-white fw-bold btn-secondary d-block mx-auto mt-1"
                onClick={addChannel}
              >
                Add Channel
              </button>
            </div>
          </div>
        </div>

        <div className="right-div px-5 pt-4">
          <div className="chat-header">
            <div className="chat-name">
              {channelId && roomName?.data()?.inputVal}
            </div>
            <div>
              <BsChatLeftDots className="message" />
            </div>
          </div>

          <div className="message-div"></div>

          <div className="chat-input">
            <div className="chat-div">
              <input className="" className="chat" placeholder="Chat" />
            </div>
            <div className="send">
              <button type="button" className="button-send">
                <AiOutlineSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Slack;
