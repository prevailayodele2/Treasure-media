import React from 'react';
// import image1 from '../Images/image3.jpg';
// import image2 from '../Images/image2.jpg';
// import image5 from '../Images/image5.jpg';
// import image4 from '../Images/image4.jpg';
// import image6 from '../Images/image6.jpg';
// import image7 from '../Images/image1.jpg';
import addFriends from '../Images/add-user.png';
import UserToFollow from '../Images/afterFollowImg.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './rightbar.css';
import { Tooltip } from '@mui/material';

export default function Follow({ userdetails }) {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  // console.log(user);
  let id = user?.other?._id;
  // console.log(id);

  const accessToken = user?.accessToken;
  const [Follow, setFollow] = useState(addFriends);
  const handleFollow = async (e) => {
    await fetch(
      `https://treasure-media-api.onrender.com/api/user/following/user/${userdetails._id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/JSON', token: accessToken },
        body: JSON.stringify({ user: `${id}` }),
      }
    );
    setFollow(UserToFollow);
  };
  return (
    <div className="Suggest-follow" key={userdetails._id}>
      <div className="suggest-user">
        <img src={`${userdetails.profile}`} className="Profileimage" alt="" />
        <Link className="suggest-userdet" to={`/Profile/${userdetails._id}`}>
          {userdetails.username}
        </Link>
        <Tooltip title='Follow User' placement='top'>
          <div onClick={(e) => handleFollow(userdetails._id)}>
            <img src={`${Follow}`} className="addfriend" alt="" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
