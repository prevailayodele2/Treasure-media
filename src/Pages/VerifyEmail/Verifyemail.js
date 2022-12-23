import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyEmail } from '../../Component/ReduxContainer/apiCall';
import { CircularProgress } from '@mui/material';

export default function Verifyemail() {
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const userDetails = user.user;
  const id = userDetails?.user;

  const handleOTP = (e) => {
    setIsLoading(true);
    e.preventDefault();
    VerifyEmail(dispatch, { OTP: OTP, user: id });
    setIsLoading(false);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#05141c',
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
        <p>Verify Email</p>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type={'number'}
            placeholder="Enter Your OTP"
            style={{
              flex: 1,
              minWidth: '40px',
              margin: '10px 0px',
              padding: '10px',
              borderRadius: '10px',
            }}
            onChange={(e) => setOTP(e.target.value)}
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
            disabled={isLoading}
            onClick={handleOTP}
          >
            {isLoading ? (
              <CircularProgress
                thickness={2}
                sx={{ padding: '0px 17px' }}
                size={22}
              />
            ) : (
              'Confirm OTP'
            )}
          </button>
          <Link to={'/register'}>
            <p
              style={{
                textDecoration: 'none',
                color: 'white',
                cursor: 'pointer',
                marginRight: '190px',
                fontSize: '14px',
              }}
            >
              Check your email to get a OTP
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
