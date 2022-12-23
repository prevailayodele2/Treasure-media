import React, { useEffect, useRef, useState } from 'react';
import LeftSide from '../../Component/ChatContainer/LeftSide';
import RightContainer from '../../Component/ChatContainer/RightContainer';
import Navbar from '../../Component/Navbar/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';

const Chat = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let id = user?.other?._id;
  const socket = useRef();
  const accesstoken = user.accessToken;
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState('');
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://treasure-media-api.onrender.com/api/user/following/${id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {}
    };
    getUser();
  }, [id, accesstoken]);
  useEffect(() => {
    if (currentChat !== '') {
      socket.current = io('https://treasure-media-api.onrender.com');
      socket?.current?.emit('addUser', id);
    }
  }, [id, currentChat]);
  console.log(socket);
  return (
    <>
      <div
        style={{
          display: 'flex',
          maxHeight: '99vh',
          flexDirection: 'column',
          width: '100%',
          height: '99vh',
          gap: '20px',
          backgroundColor: '#05141c',
          alignItems: 'center',
        }}
      >
        <Navbar />
        <div style={{ display: 'flex', width: ' 95%', height: '100%' }}>
          <LeftSide users={users} id={id} setCurrentChat={setCurrentChat} />
          <RightContainer currentChat={currentChat} />
        </div>
      </div>
    </>
  );
};

export default Chat;
