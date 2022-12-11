import React, { useEffect } from 'react';
import './profileleftbar.css';
import image from '../Images/Profile.png';
//import image2 from '../Images/image2.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Divider, Stack } from '@mui/material';
export default function ProfileLeftbar() {
  let location = useLocation();
  let id = location.pathname.split('/')[2];
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const [Follow, setUnFollow] = useState([
    user.other.Following.includes(id) ? 'Unfollow' : 'Follow',
  ]);
  const accessToken = user.accessToken;
  console.log(accessToken);
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

  console.log(Followinguser);

  return (
    <div className="ProfileLeftbar">
       <div className="NotificationsContainerzzyy">
        <Stack p={2}>
         <img src={user?.other?.profile} alt="" />
         <span className='name'>{user?.other?.username}</span>
         <span className='description'>I think i am in love</span>
         <Divider />
         <div className="followzz">
          <div className='One'>
            <span>{user?.other?.Following.length}</span>
            <span style={{color: '#aaaaaad0'}}>Following</span>
          </div>
          <Divider variant='middle' orientation='vertical' flexItem sx={{color: '#fff'}} />
          <div className='One'>
            <span>{user?.other?.Followers.length}</span>
            <span style={{color: '#aaaaaae0'}}>Followers</span>
          </div>
         </div>
         <Divider />
         <Link className='view-profile' to={`/Profile/${id}`}>Edit Bio</Link>
        </Stack>
      </div>

      <div className="NotificationsContainer">
        <Stack p={2}>
          <h3>Followings</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{}}>Friends</p>
            <p style={{ color: '#aaa' }}>See all</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '15px',
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
                      fontSize: 19,
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
