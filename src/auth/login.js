import React, { StrictMode, useContext, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { auth, db } from '../firebase';
import { UserContext } from '../context';
import {useNavigate} from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
export default function Login() {
  const navigate = useNavigate();
  function googleHandler() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((auth) => {});
  }

  onAuthStateChanged(auth, (data) => {
    db.collection('users')
      .doc(auth.currentUser.uid)
      .set({
        email: auth.currentUser.email,
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      });
   navigate("/setup-team")
  });

  return (
    <div className="Login pt-5">
      <img
        src="slack.jpg"
        alt="slackimg"
        style={{ width: '100px' }}
        className="mx-auto d-block"
      />
      <div>
        <h1 className="fw-bold text-center pt-4" style={{ fontSize: '40px' }}>
          First, enter your email
        </h1>
        <div className="text-center fs-6" style={{ fontWeight: '600' }}>
          We suggest using the email address you use at work.
        </div>
      </div>
      <input
        type="email"
        className="d-block mx-auto mt-4 form-control fs-5"
        placeholder="name@work-email.com"
        style={{ width: '370px' }}
      />
      <button
        type="button"
        className="btn mx-auto d-block text-white fw-bold mt-4 fs-5"
        style={{ width: '370px', backgroundColor: 'purple' }}
      >
        Continue
      </button>

      <div className="d-flex mt-4" style={{ justifyContent: 'center' }}>
        <div
          className=""
          style={{
            width: '157px',
            height: '13px',
            borderBottom: '1px solid rgba(0,0,255,0.2)',
          }}
        ></div>
        <div className="px-3">OR</div>
        <div
          className=""
          style={{
            width: '157px',
            height: '13px',
            borderBottom: '1px solid rgba(0,0,255,0.2)',
          }}
        ></div>
      </div>
      <div>
        <button
          type="button"
          className="d-flex btn border border-3 fw-bold mx-auto mt-4"
          style={{
            width: '370px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={googleHandler}
        >
          <FcGoogle className="fs-5" />{' '}
          <div className="ps-2">Continue With Google</div>
        </button>
        <button
          type="button"
          className="d-flex btn border border-3 fw-bold mx-auto mt-3"
          style={{
            width: '370px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AiFillApple className="fs-5" />{' '}
          <div className="ps-2">Continue With Apple</div>
        </button>
      </div>

      <div className="mt-4">
        <div className="fs-6 text-secondary text-center">
          Already using Slack?
        </div>
        <a href="https://slack.com/signin">
          <div className="text-primary text-center">
            Sign in to an existing workspace
          </div>
        </a>
      </div>
    </div>
  );
}
