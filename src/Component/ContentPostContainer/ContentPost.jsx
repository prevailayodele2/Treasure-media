import React from 'react';
import './contentpost.css';
// import imageIcon from '../Images/gallery.png';
// import emojiIcon from '../Images/cat-face.png';
// import VideoIcon from '../Images/video.png';
//import profileimage from '../Images/Profile.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { ImageSquare, PaperPlaneTilt, YoutubeLogo } from 'phosphor-react'
import app from '../../firebase';
import { Tooltip } from '@mui/material'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

export default function ContentPost() {

  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  //let id = user?.other?._id;
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [title, setTile] = useState('');
  const [imagePre, setImagePre] = useState(null);
  const [VideoPre, setVideoPre] = useState(null);
  const accessToken = user.accessToken;
  console.log(file?.name);

  const handlePost = (e) => {
    e.preventDefault();
    if (file !== null) {
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
              default: <></>
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch(`https://treasure-media-api.onrender.com/api/post/user/post`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/JSON',
                token: accessToken,
              },
              body: JSON.stringify({
                title: title !== ' ' || null || undefined ? title : ' ',
                image: downloadURL,
                video: '',
              }),
            }).then((data) => {
              alert('Your Post was upload successfully');
              window.location.reload(true);
            });
            console.log(downloadURL)
          });
        }
      );
    } else if (file2 !== null) {
      const fileName = new Date().getTime() + file2?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, file2);
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
              default: <></>
          }
        },
        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch(`https://treasure-media-api.onrender.com/api/post/user/post`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/JSON',
                token: accessToken,
              },
              body: JSON.stringify({
                title: title !== ' ' || null || undefined ? title : ' ',
                video: downloadURL,
                image: '',
              }),
            }).then((data) => {
              alert('Your Post was upload successfully');
              window.location.reload(true);
            });
          });
        }
      );
    } else {
      fetch(`https://treasure-media-api.onrender.com/api/post/user/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON', token: accessToken },
        body: JSON.stringify({ title: title, video: '', image: '' }),
      }).then((data) => {
        alert('Your Post was upload successfully');
        window.location.reload(true);
      });
    }
  };
  return (
    <div>
      <div className="ContentUploadContainer">
        <div className='first-div'>
          <img
            src={`${user?.other?.profile}`}
            className="profileimage"
            alt=""
          />
        </div>
        <div className='second-div'>
          <div className='captionInput'>
          <input
            type="text"
            className="contentWritingpart"
            placeholder="Write your real thought....."
            onChange={(e) => setTile(e.target.value)}
            />
            </div>
          {imagePre !== null ? (
            <img
              src={imagePre}
              style={{
                width: '410px',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
              alt=""
            />
          ) : VideoPre !== null ? (
            <video className="PostImages" width="500" height="500" controls>
              <source src={VideoPre} type="video/mp4" />
            </video>
          ) : (
            ''
          )}
          <div className='post-footer'>
            <div className='post-footer-first-div'>
              <Tooltip title='Upload Photo' placement='bottom'>
              <label className='photos' htmlFor="file">
               <ImageSquare size={20} color='#41e30b' />
                <span>Photos</span>
                <input
                  type="file"
                  name="file"
                  id="file"
                  style={{ display: 'none' }}
                  onChange={(e) => [
                    setFile(e.target.files[0]),
                    setImagePre(URL.createObjectURL(e.target.files[0])),
                  ]}
                  />
              </label>
                  </Tooltip>
              {/* <img src={`${emojiIcon}`} className="icons" alt="" /> */}
              <Tooltip title='Upload Video' placement='bottom'>
              <label className='videos' htmlFor="file2">
                <YoutubeLogo size={20} color='blue' />
                <span>Video</span>
                <input
                  type="file"
                  name="file2"
                  id="file2"
                  style={{ display: 'none' }}
                  onChange={(e) => [
                    setFile2(e.target.files[0]),
                    setVideoPre(URL.createObjectURL(e.target.files[0])),
                  ]}
                  />
              </label>
                  </Tooltip>
            </div>
            <Tooltip title='Upload Post' placement='bottom'>
            <button
              className='post-button-upload'
              onClick={handlePost}
              >
              Post
              <PaperPlaneTilt size={20} color='#fff' />
            </button>
              </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
