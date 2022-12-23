//import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Resetpassword() {
  const location = useLocation();
  const code = location.search.split('?')[1];
  const [password, setpassword] = useState('');
  const handleClick = async (e) => {
    e.preventDefault();
    await fetch(`https://treasure-media-api.onrender.com/api/user/reset/password?${code}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify({ password: password }),
    }).then((data) => {
      alert('Your password rest successfully');
    });
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        backgroundColor: '#05141c',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '25%',
          padding: '20px',
          margin: 'auto',
          borderRadius: '10px',
          backgroundColor: ' #28353e',
        }}
      >
        <p style={{ color: 'white' }}>Enter Your New Password</p>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type={'password'}
            placeholder="**********"
            style={{
              flex: 1,
              minWidth: '40px',
              margin: '10px 0px',
              padding: '10px',
              borderRadius: '10px',
            }}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            style={{
              width: '40%',
              border: 'none',
              padding: '10px 20px',
              backgroundColor: '#1a2024',
              color: 'black',
              borderRadius: '10px',
              margin: '20px 0px',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}
