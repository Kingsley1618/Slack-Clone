import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context';
import firebase from 'firebase/compat/app';
import { auth, db, storage } from '../firebase';
import 'firebase/compat/storage';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import './second.css';
function Personal() {
  const [val, setVal] = useState();
  const { teamname, setTeamname } = useContext(UserContext);
  const { userName, setUserName } = useContext(UserContext);
  const { numb, setNumb } = useState(10);
  const [file, setFile] = useState('');

  // progress
  const [percent, setPercent] = useState(0);
  const navigate = useNavigate();
  const [user] = useDocument(db.collection('users')?.doc(auth.currentUser.uid));

  function changeUserName() {
    db.collection('users')?.doc(auth.currentUser.uid).update({ userName });
    navigate('/setup-slack');
  }
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  function changeHandler(event) {
    setUserName(event.target.value);
    localStorage.setItem('username', event.target.value);
    setNumb((numb) => numb - userName.length);
  }

  useEffect(() => {
    setUserName(localStorage.getItem('username'));
  });

  function handleUpload() {
    if (!file) {
      alert('Please choose a file first!');
    }

    const storageRef = firebase.storage().ref(`/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    storageRef.put(file).on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          db.collection('users')
            .doc(auth.currentUser.uid)
            .update({ photoURL: url });
        });
      }
    );
  }

  return (
    <div className="">
      <div className="team-header"></div>

      <div className="main-div">
        <div className="left-div">
          <h5 className="team-name">{user?.data().teamname}</h5>

          <div className="">
            <div
              className="ps-3 pt-1"
              style={{ color: 'rgba(255,255,255,0.72)' }}
            >
              Direct messages
            </div>

            <div className="ps-2 d-flex mt-1" style={{ alignItems: 'center' }}>
              {' '}
              <img
                src={user?.data().photoURL}
                className="personal-small-image"
                alt="upload"
              />
              <div
                className="personal-name px-2 fw-bold"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  position: 'relative',
                  top: '2px',
                }}
              >
                {userName}
              </div>
              <div className="ps-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                you
              </div>
            </div>
          </div>
        </div>

        <div className="right-div px-5 pt-4">
          <div style={{ fontSize: '13px' }}>Step 2 of 2</div>

          <h1 className="fw-bold pt-3">What’s your name?</h1>
          <div>
            Adding your name and profile photo helps your teammates recognize
            and connect with you more easily.
          </div>
          <div style={{ width: '100%' }}>
            <input
              type="text"
              value={userName}
              onChange={changeHandler}
              maxlength="10"
              placeholder="Enter your full name"
              className="form-control w-100 mt-4 fs-5"
            />
            <div>{numb}</div>
          </div>

          <div className="mt-5">
            <h6>Your profile photo(optional)</h6>

            <div className="d-flex">
              <input type="file" onChange={handleChange} accept="/image/*" />

              <div className="ps-3">
                <div>
                  Help your teammates know they’re talking to the right person.
                </div>
                <button
                  type="button"
                  className="btn border border-2 mt-3 fw-bold"
                  onClick={handleUpload}
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          <button className="button-next btn" onClick={changeUserName}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default Personal;
