import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './signup.css';
import { signup } from '../../Component/ReduxContainer/apiCall';
import app from '../../firebase';
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { CircularProgress } from '@mui/material';

export default function Signup() {
  const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  console.log(user);
  const [email, setEmail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [file, setfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = user.user;
  const navigator = useNavigate();
  // useEffect(()=>{
  //   if ( isFetching === false && error ===false){
  //     navigator('/verify/email')
  //   }
  // },[error, isFetching, navigator])

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          signup(dispatch, {
            email,
            password,
            username,
            phonenumber,
            profile: downloadURL,
          });
        });
      }
    );
    setIsLoading(false);
  };
  if (userDetails?.status === 'Pending') {
    navigator('/verify/email');
  }
  return (
    <div className="mainContainerForsignup">
      <div className="submainContainer">
        <div style={{ flex: 1 }}>
          <p style={{ color: '#fff' }} className="logoText">
            Soc<span className="part">ial</span>
          </p>
          <p style={{ color: '#fff' }} className="introtext">
            Connect with your <span className="part">family and friends </span>
          </p>
        </div>
        <div
          style={{
            flex: 1,
            gap: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p className="createaccountTxt">Create New Account</p>

          <input
            type="file"
            name="file"
            id="file"
            style={{ color: '#fff', fontSize: '15px' }}
            onChange={(e) => setfile(e.target.files[0])}
          />
          <div className="signupInputContainer">
            <label>Username</label>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setusername(e.target.value)}
              className="inputText"
            />
          </div>
          <div className="signupInputContainer">
            <label>Phone</label>
            <input
              type="text"
              placeholder="00134760438"
              onChange={(e) => setphonenumber(e.target.value)}
              className="inputText"
            />
          </div>
          <div className="signupInputContainer">
            <label>E-mail</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="inputText"
            />
          </div>
          <div className="signupInputContainer">
            <label>Password</label>
            <input
              type="password"
              placeholder="******"
              name=""
              onChange={(e) => setpassword(e.target.value)}
              id=""
              className="inputText"
            />
          </div>
          <button
            className="btnforsignup"
            disabled={isLoading}
            onClick={handleClick}
          >
            {isLoading ? (
              `
              Loading
              ${<CircularProgress
                thickness={2}
                sx={{ padding: '0px 17px' }}
                size={22}
              />}
              `
            ) : (
              'Signup'
            )}
          </button>
          <Link to={'/login'}>
            <p style={{}}>Already have a account</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
