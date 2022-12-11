import React, { useEffect } from 'react';
import './profilemainPost.css';
import Coverimage from '../Images/Profile.png';
import ContentPost from '../ContentPostContainer/ContentPost';
import Post from '../ProfilePostContainer/Post';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
export default function ProfileMainPost() {
  const [post, setPost] = useState([]);
  let location = useLocation();
  let id = location.pathname.split('/')[2];
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `https://treasure-media-api.onrender.com/api/post/get/post/${id}`
        );
        setPost(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log('error occured');
      }
    };
    getPost();
  }, [id]);

  return (
    <div className="ProfilemainPostContainer">
        <div>
          <img src={`${Coverimage}`} className="profileCoverimage" alt="" />
          <h2
            style={{
              marginTop: -43,
              color: 'white',
              textAlign: 'start',
              marginLeft: '34px',
            }}
          >
            Your Profile
          </h2>
        </div>
        <ContentPost />
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          borderRadius: '20px',
        }}
      >
        {post.map((item) => (
          <Post detail={item} />
        ))}
      </Stack>
    </div>
  );
}
