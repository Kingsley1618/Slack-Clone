import React from 'react';
import { useState, useContext, useEffect } from 'react';
import './slack.css';
import { UserContext } from '../context';
import './slackTwo.css';

import { AiOutlineClockCircle } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import firebase from 'firebase/compat/app';
import { auth, db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineAudio } from 'react-icons/ai';
import { UserActions } from '../store';
import { BsChatLeftDots } from 'react-icons/bs';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { AiOutlineSend } from 'react-icons/ai';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { PiNotePencilDuotone } from 'react-icons/pi';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { BiSolidRightArrow } from 'react-icons/bi';
function Slack() {
  const [channel, setChannel] = useState();

  const { inputVal, setInputVal } = useContext(UserContext);
  const channelId = useSelector((state) => state.id);
  const [text, setText] = useState();
  const [newChannel, error, loading] = useCollection(db.collection('rooms'));
  const [photo] = useDocument(
    db.collection('users')?.doc(auth.currentUser.uid)
  );
  const [messageText] = useCollection(
    channelId && db.collection('rooms').doc(channelId).collection('messages')
  );
  const [roomName, stop, waiting] = useDocument(
    channelId && db.collection('rooms').doc(channelId)
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  function toggleChannel() {
    setOpen((open) => !open);
  }
  function sendMessage() {
    db.collection('rooms').doc(channelId).collection('messages').add({
      text,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText('');
  }

  function addChannel() {
    db.collection('rooms').add({ inputVal });
  }

  function selectChannel(id) {
    dispatch(UserActions.selectId({ id }));
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function startAudio() {
    SpeechRecognition.startListening();
  }
  useEffect(() => {
    function changingVoice() {
      if (transcript !== '' || transcript !== null || transcript !== ' ') {
        setText(transcript);
      }
    }

    changingVoice();
  }, [transcript]);
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
          <img src={photo?.data().photoURL} className="profile-img" />
        </div>
      </div>

      <div className="main-div">
        <div className="left-div">
          <div className="left-header">
            <div className="text-white fw-bold">{photo?.data().userName}</div>

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

          {newChannel?.docs?.map((doc) => {
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

          <div className="message-div">
            {messageText?.docs.map((doc) => {
              return (
                <div className="text-div">
                  <div className="text">{doc.data().text}</div>
                </div>
              );
            })}
          </div>

          <div className="chat-input">
            <div className="chat-div">
              <input
                className=""
                className="chat"
                placeholder="Chat"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            </div>
            <div className="send">
              <button
                type="button"
                className="button-send"
                onClick={sendMessage}
              >
                <AiOutlineSend />
              </button>
            </div>

            <div>
              <button onClick={startAudio} className="audio">
                <AiOutlineAudio />
              </button>
            </div>
            {listening ? <div className="rec">rec</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Slack;
