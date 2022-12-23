import React, { useEffect, useState } from 'react';
import './profilerightbar.css';
import axios from 'axios';
import Follow from '../RightsideContainer/Follow';
import { useSelector } from 'react-redux';
import { Divider, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function ProfileRightbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let location = useLocation();
  let id = location.pathname.split('/')[2];
  let idforSuggest = user?.other?._id;
  const [Followinguser, setFollowinguser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `https://treasure-media-api.onrender.com/api/user/followers/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log('Error');
      }
    };
    getFollowing();
  }, [id]);


  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `https://treasure-media-api.onrender.com/api/user/all/user/${idforSuggest}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log('Some error occured');
      }
    };
    getuser();
  }, [idforSuggest]);

  return (
    <div className="Profilerightbarr">
      <div className="profilerightcontainercc">
        <Stack p={1}>
          <h3>Followers</h3>
          <Divider />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingTop: '10px',
            }}
          >
            {Followinguser.map((item, i) => (
              <div key={i} className="followingfollow">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={`${item.profile}`}
                    className="Friendsimage"
                    alt=""
                  />
                  <p
                    style={{
                      fontSize: 17,
                      fontWeight: 500,
                      fontStyle: 'italic',
                      color: '#fff',
                    }}
                  >
                    {item.username}{' '}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </div>

      <div className="rightcontainer23">
        <Stack p={1}>
          <h3 style={{ textAlign: 'start',marginLeft: 10, color: '#fff', }}>Suggested for you</h3>
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
