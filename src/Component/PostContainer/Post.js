import React, { useState } from 'react';
import './post.css';
import ProfileImage from '../Images/Profile.png';
import LikeIcon from '../Images/like.png';
import CommentIcon from '../Images/speech-bubble.png';
import Shareicon from '../Images/share.png';
// import Moreoption from '../Images/more.png';
import anotherlikeicon from '../Images/setLike.png';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { DotsThreeOutlineVertical, PaperPlaneTilt } from 'phosphor-react';
import { Divider, Stack } from '@mui/material';
import PostPopup from './PostPopup';

export default function Post({ post }) {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails?.user;
  const [user, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `https://treasure-media-api.onrender.com/api/user/post/user/details/${post.user}`
        );
        setuser(res.data);
      } catch (error) {
        console.log('Some error occured');
      }
    };
    getuser();
  }, [post]);
  const userId = users.other._id;
  const accessToken = users.accessToken;
  const [Like, setLike] = useState([
    post.like.includes(userId) ? anotherlikeicon : LikeIcon,
  ]);
  const [count, setCount] = useState(post.like.length);
  const [Comments, setComments] = useState(post.comments);
  const [commentwriting, setcommentwriting] = useState('');
  const [show, setshow] = useState(false);

  const handleLike = async () => {
    if (Like == LikeIcon) {
      await fetch(
        `https://treasure-media-api.onrender.com/api/post/${post._id}/like`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/Json', token: accessToken },
        }
      );
      setLike(anotherlikeicon);
      setCount(count + 1);
    } else {
      await fetch(
        `https://treasure-media-api.onrender.com/api/post/${post._id}/like`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/Json', token: accessToken },
        }
      );
      setLike(LikeIcon);
      setCount(count - 1);
    }
  };

  const addComment = async () => {
    const comment = {
      postid: `${post._id}`,
      username: `${users.other.username}`,
      comment: `${commentwriting}`,
      profile: `${users.other?.profile}`,
    };
    await fetch(
      `https://treasure-media-api.onrender.com/api/post/comment/post`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/Json', token: accessToken },
        body: JSON.stringify(comment),
      }
    );
    setComments(Comments.concat(comment));
  };

  const handleComment = () => {
    addComment();
  };

  // const handleshow = () => {
  //   if (show === false) {
  //     setshow(true);
  //   } else {
  //     setshow(false);
  //   }
  // };

  const [mobileAnchor, setMobileAnchor] = React.useState(null);
  const handleMobileMenuClose = () => {
    setMobileAnchor(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileAnchor(event.currentTarget);
  };

  return (
    <div className="PostContainerdd">
      <div className="SubPostContainerss">
        <div className="postcontainer-header">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '14px',
              alignItems: 'center',
            }}
          >
            {user?.profile === '' ? (
              <img
                src={`${ProfileImage}`}
                loading="lazy"
                className="PostImage"
                alt=""
              />
            ) : (
              <img
                src={`${user.profile}`}
                loading="lazy"
                className="PostImage"
                alt=""
              />
            )}
            <div>
              <p
                style={{
                  color: '#fff',
                  fontSize: '15px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontStyle: 'italic',
                }}
              >
                {user.username}
              </p>
            </div>
          </div>
          <DotsThreeOutlineVertical
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            cursor={'pointer'}
            size={20}
            color="#fff"
            
          />
        </div>
        {
          <PostPopup
            handleMobileMenuClose={handleMobileMenuClose}
            mobileAnchor={mobileAnchor}
            id ={ userId}
            image={post?.image}
          />
        }
        <div className="post-captionss">
          <p>{post.title}</p>
        </div>
        {post.image !== '' ? (
          <img
            src={`${post.image}`}
            loading="lazy"
            className="PostImagess"
            alt=""
          />
        ) : post.video !== '' ? (
          <video className="PostImages" width="500" height="500" controls>
            <source src={`${post.video}`} type="video/mp4" />
          </video>
        ) : (
          ''
        )}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '17px',
              paddingLeft: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '10px',
              }}
            >
              <img
                src={`${Like}`}
                className="iconsforPost"
                onClick={handleLike}
                loading="lazy"
                alt=""
              />
              <p
                style={{
                  fontSize: '17px',
                  color: '#fff',
                  fontWeight: 500,
                  fontStyle: 'italic',
                }}
              >
                {count} Likes
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <img
                src={`${CommentIcon}`}
                className="iconsforPost"
                onClick={() => setshow((see) => !see)}
                loading="lazy"
                alt=""
              />
              <p
                style={{
                  fontSize: '17px',
                  color: '#fff',
                  fontWeight: 500,
                  fontStyle: 'italic',
                }}
              >
                {Comments.length} Comments
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              paddingRight: '20px',
              gap: '10px',
            }}
          >
            <img
              src={`${Shareicon}`}
              className="iconsforPost"
              loading="lazy"
              alt=""
            />
            <p
              style={{
                fontSize: '17px',
                color: '#fff',
                fontWeight: 500,
                fontStyle: 'italic',
              }}
            >
              Share
            </p>
          </div>
        </div>
        {show && (
          <div className="Comment-container-post">
            <div className="write-coment-post">
              <img
                src={`${users.other.profile}`}
                className="PostImage"
                loading="lazy"
                alt=""
              />
              <input
                type="text"
                className="commentinput"
                placeholder="Write your thought"
                onChange={(e) => setcommentwriting(e.target.value)}
              />
              <button className="addCommentbtn" onClick={handleComment}>
                Post
                <PaperPlaneTilt size={21} color="#fff" />
              </button>
            </div>
            {Comments.map((item) => (
              <div className="comment-show-container">
                {item.profile === '' ? (
                  <img
                    src={`https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                    className="PostImage"
                    loading="lazy"
                    alt=""
                  />
                ) : (
                  <img
                    src={`${item.profile}`}
                    className="PostImage"
                    loading="lazy"
                    alt=""
                  />
                )}
                <Stack
                  display={'flex'}
                  flexDirection="column"
                  lineHeight={'0px'}
                  justifyContent="center"
                  textAlign={'start'}
                >
                  <p style={{ fontSize: 17, fontWeight: 500, color: '#fff' }}>
                    {item.username}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 500, color: '#fff' }}>
                    {item.comment}
                  </p>
                  <p
                    style={{
                      color: '#aaa',
                      fontSize: 11,
                    }}
                  >
                    Reply
                  </p>
                </Stack>
                <Divider />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
