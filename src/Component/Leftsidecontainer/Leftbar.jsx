import React, { useEffect, useState } from 'react';
import './leftbar.css';
// import image from '../Images/Profile.png';
// import image1 from '../Images/image1.jpg';
// import image2 from '../Images/image2.jpg';
// import image3 from '../Images/image3.jpg';
// import image4 from '../Images/image4.jpg';
// import image5 from '../Images/image5.jpg';
// import image6 from '../Images/image6.jpg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Leftbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user?.other?._id;
  const accesstoken = user.accessToken;
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `https://treasure-media-api.onrender.com/api/user/follower/post/${id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setPost(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } catch (error) {}
    };
    getPost();
  }, [id, accesstoken]);

  console.log(user)

  return (
    <div className="Leftbar">
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
         <Link className='view-profile' to={`/Profile/${id}`}>My Profile</Link>
        </Stack>
      </div>

      <div className="NotificationsContainerzz">
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p style={{ marginLeft: '-20px' }}>Explore</p>
          <p style={{ color: '#aaa', marginLeft: '40px' }}>See all</p>
        </div>
        <div>
          {post.map((item) => [
            item.image === '' ? (
              ''
            ) : (
              <img src={`${item.image}`} className="exploreimage" alt="" />
            ),
          ])}
        </div>
      </div>
    </div>
  );
}
