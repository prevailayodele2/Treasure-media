import React, { useEffect } from 'react';
import './rightbar.css';
import ads from '../Images/ads.jpg';
import image1 from '../Images/image3.jpg';

//import addFriends from "../Images/add-user.png"
import axios from 'axios';
import { useState } from 'react';
import Follow from './Follow';
import { useSelector } from 'react-redux';
import { Stack, Divider } from '@mui/material';
export default function Rightbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  const id = user?.other?._id;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `https://treasure-media-api.onrender.com/api/user/all/user/${id}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log('Some error occured');
      }
    };
    getuser();
  }, [id]);
  return (
    <div className="rightbar">
      <div className="rightcontainer">
        <div className="adsContainer">
          <img src={`${ads}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}
            >
              CodeDemy
            </p>
            <p
              style={{
                textAlign: 'start',
                marginLeft: '10px',
                fontSize: '12px',
                marginTop: '-16px',
              }}
            >
              Buy codedemy course
            </p>
          </div>
        </div>
        <div className="adsContainer">
          <img src={`${image1}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}
            >
              CodeDemy
            </p>
            <p
              style={{
                textAlign: 'start',
                marginLeft: '10px',
                fontSize: '12px',
                marginTop: '-16px',
              }}
            >
              Buy codedemy course
            </p>
          </div>
        </div>
      </div>

      <div className="rightsuggestcontainer2">
            <h4 style={{ color: '#fff', marginLeft: '30px' }}>Sugested for you</h4>
            <Divider />
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
          p={1.5}
        >
          <Stack sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: 'auto',
            maxHeight: '50vh',
            overflow: 'hidden',
            overflowY: 'scroll',
          }}>
            {users.map((item, i) => (
              <Follow key={i} userdetails={item} />
            ))}
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
