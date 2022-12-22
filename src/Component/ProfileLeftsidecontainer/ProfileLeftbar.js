import React, { useEffect } from 'react';
import './profileleftbar.css';
// import image from '../Images/Profile.png';
//import image2 from '../Images/image2.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
export default function ProfileLeftbar() {
  let location = useLocation();
  let id = location.pathname.split('/')[2];
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const [Follow, setUnFollow] = useState([
    user.other.Following.includes(id) ? 'Unfollow' : 'Follow',
  ]);
  const accessToken = user.accessToken;
  //let username = user?.other?.username;

  const [users, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `https://treasure-media-api.onrender.com/api/user/post/user/details/${id}`
        );
        setuser(res.data);
      } catch (error) {
        console.log('Some error occured');
      }
    };
    getuser();
  }, [id]);
  let followersCounter = users?.Followers?.length;
  let followingCounter = users?.Following?.length;

  const [Followinguser, setFollowinguser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `https://treasure-media-api.onrender.com/api/user/following/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log('Error');
      }
    };
    getFollowing();
  }, [id]);

  const handleFollow = async () => {
    if (Follow === 'Follow') {
      await fetch(
        `https://treasure-media-api.onrender.com/api/user/following/user/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/JSON', token: accessToken },
          body: JSON.stringify({ user: `${user.other._id}` }),
        }
      );
      setUnFollow('UnFollow');
    } else {
      await fetch(
        `https://treasure-media-api.onrender.com/api/user/following/user/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/JSON', token: accessToken },
          body: JSON.stringify({ user: `${user.other._id}` }),
        }
      );
      setUnFollow('Follow');
    }
  };

  return (
    <div className="ProfileLeftbar">
      <div className="NotificationsContainer">
        {/* <img src={`${image}`} className="ProfilepageCover" alt="" /> */}
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', lineHeight: '3px', paddingTop: '10px' }}>
          <img src={`${users.profile}`} className="Profilepageimage" alt="" />
          <div>
            <p
              style={{
                color: '#fff',
                fontSize: 19,
                fontWeight: 500,
              }}
            >
              {users.username}
            </p>
            <p
              style={{
                color: '#fff',
                textAlign: 'start',
                fontSize: 13,
              }}
            >
              Software Developer
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p style={{ color: 'black',  fontSize: '14px' }}>
            Followings
          </p>
          <p
            style={{
              color: '#fff',
              fontSize: '12px',
            }}
          >
            {followingCounter}
          </p>
        </div>
        <Stack display={'flex'} flexDirection='column' lineHeight={'1px'}>


        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <p style={{ color: 'black',  fontSize: '14px' }}>
            Followers
          </p>
          <p
            style={{
              color: '#fff',
              fontSize: '12px',
            }}
            >
            {followersCounter}
          </p>
        </div>
          </Stack>
        <div style={{  }}>
          <h5
            style={{
              color: '#fff',
              marginLeft: 10,
              fontSize: '14px',
              textAlign: 'start',
            }}
            >
            User bio
          </h5>
          <p
            style={{
              color: '#fff',
              fontSize: '12px',
              textAlign: 'start',
              lineHeight: '13px',
              marginLeft: 10
            }}
          >
            I would rather be despised of who I am, rather than loved by who I
            am not.
          </p>
        </div>
        {user.other._id !== id ? (
          <div onClick={handleFollow}>
            <button
              style={{
                width: '90%',
                border: 'none',
                backgroundColor: 'green',
                color: 'white',
                marginBottom: 10,
                borderRadius: '10px',
                cursor: 'pointer',
                padding: '5px 0px',
              }}
            >
              {Follow}
            </button>
          </div>
        ) : (
          <div>
            <button
              style={{
                width: '90%',
                border: 'none',
                backgroundColor: 'green',
                color: 'white',
                marginBottom: 10,
                borderRadius: '10px',
                cursor: 'pointer',
                padding: '5px 0px',
              }}
            >
              Edit Bio
            </button>
          </div>
        )}
      </div>

      <div className="NotificationsContainer">
        <Stack p={1}>
          <h4>Followings</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{}}>Friends</p>
            <p style={{ color: '#aaa', cursor: 'pointer' }}>See all</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {Followinguser.map((item) => (
              <Link
                style={{ textDecoration: 'none' }}
                to={`/Profile/${item._id}`}
              >
                <div className='followingfollow' style={{padding: '5px 8px'}} key={item._id}>
                  <img
                    src={`${item?.profile}`}
                    className="friendimage"
                    alt=""
                  />
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      fontStyle: 'italic',
                      color: '#fff',
                    }}
                  >
                    {item?.username}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Stack>
      </div>
    </div>
  );
}
