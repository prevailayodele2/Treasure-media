import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './login.css';
import { useState } from 'react';
import { login } from '../../Component/ReduxContainer/apiCall';
import { CircularProgress } from '@mui/material';
import {styled} from '@mui/system';

const LoginContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#05141c',
}));
const LoginFirstDiv = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'center',
  alignItems: 'center',
}));
const LoginSecondDiv = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  'div':{
    
  }
}));
const InnerContainer = styled('div')(({ theme }) => ({
  flexDirection: 'column',
  button: {
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 500,
    backgroundColor: '#28353e',
    color: '#fff',
    cursor: 'pointer',
  },
  'button:hover': {
    backgroundColor: '#1a2024',
  },
}));
const Header = styled('h2')(({ theme }) => ({
  color: '#fff',
  fontSize: '40px',
  fontWeight: 600,
  fontStyle: 'italic',
}));
const LastFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '100px',
  a: {
    textDecoration: 'none',
  },
  'a:hover': {
    textDecoration: 'underline',
  },
}));
const INputContainer = styled('div')(({ theme }) => ({
  // border: '1px solid black',
  padding: '',
  backgroundColor: '#28353e',
  borderRadius: '20px',
  marginBottom: '10px',
  label: {
    fontSize: '18px',
    fontWeight: 500,
    color: '#fff',
    marginLeft: '5px',
  },

  input: {
    border: 'none',
    outline: 'none',
    height: '33px',
    fontSize: '16px',
    fontWeight: 400,
    color: '#a19c9c',
    backgroundColor: '#28353e',
    marginLeft: '5px',
    borderRadius: '20px',
    width: '300px',
    // boxShadow: 'inset 8px 8px 12px #05141c, inset -8px -8px 12px #05141c'
  },
}));

export default function Login() {
  const dispatch = useDispatch();
  //const {isFetching  , error} = useSelector((state)=>state.user);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login(dispatch, { email, password });
    setIsLoading(false);
  };
  return (
    <>
      <LoginContainer>
        <LoginFirstDiv>
          <div>
          <p style={{ color: '#fff' }} className="logoText">
            Soc<span className="part">ial</span>
          </p>
          <p style={{ color: '#fff' }} className="introtext">
            Connect with your <span className="part">family and friends </span>
          </p>
          </div>
        </LoginFirstDiv>
        <LoginSecondDiv>
          <InnerContainer>
            <Header>Login</Header>
            <INputContainer>
              <label>{'E-mail'}</label>
              <input
                type="email"
                name=""
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setemail(e.target.value)}
              />
            </INputContainer>
            <INputContainer>
              <label>password</label>
              <input
                type="password"
                placeholder="******"
                name=""
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
            </INputContainer>
            <button onClick={handleClick} disabled={isLoading}>
              {!isLoading ? (
                'Continue'
              ) : (
                `
                Loading
                ${<CircularProgress
                  thickness={2}
                  sx={{ padding: '0px 17px' }}
                  size={22}
                />}
                `
              )}
            </button>
          </InnerContainer>
          <LastFooter>
            <Link to={'/forgot/password'}>
              <p style={{}}>Forgot password</p>
            </Link>
            <Link to={'/signup'}>
              <p style={{}}>Create New Account</p>
            </Link>
          </LastFooter>
        </LoginSecondDiv>
      </LoginContainer>
    </>
  );
}
