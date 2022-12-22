import React, { useEffect, useRef, useState } from 'react';
import './ChatContainer.css';
// import profileImage from '../Images/Profile.png'
import { Stack } from '@mui/material';
import { DotsThree } from 'phosphor-react';
import Footer from './Footer';
import Message from './message';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { io } from 'socket.io-client'

export const TopRightChat = ({ currentChat }) => {
  return (
    <>
      <div className="topChatContainer">
        <Stack p={2} display="flex" flexDirection={'row'} gap="15px">
          <img src={currentChat?.profile} alt="" />
          <Stack alignItems={'center'} lineHeight="6px" textAlign={'left'}>
            <p>{currentChat?.username}</p>
            <span>online</span>
          </Stack>
        </Stack>
        <DotsThree size={'22px'} color="#fff" cursor={'pointer'} />
      </div>
    </>
  );
};

const RightContainer = ({ currentChat }) => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let id = user?.other?._id;
  const scroll = useRef()
  const socket = useRef()
  const accesstoken = user.accessToken;
  const [message, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [writeMessage, setWriteMessage] = useState('');
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chat/get/chat/msg/${id}/${currentChat?._id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setMessages(res.data);
      } catch (error) {}
    };
    getMessages();
  }, [id, accesstoken, currentChat._id]);
  useEffect(()=>{
     scroll?.current?.scrollIntoView({behaviour: "smooth"})
     setWriteMessage('')
  },[message])
  useEffect(()=>{
     if (socket.current ){
        socket.current.on('msg-receive', (msg)=>{
          console.log(msg)
          setArrivalMessage({myself: false, message: msg})
        })
     }
  },[arrivalMessage])
  useEffect(()=>{
     arrivalMessage && setMessages((pre)=>[...pre, arrivalMessage])
  },[arrivalMessage])
  return (
    <>
      {message?.length > 0 ? (
        <div className="rightchatContainer">
          <TopRightChat currentChat={currentChat} />
          <Message scroll={scroll} message={message} />
          <Footer
            currentChat={currentChat}
            setMessages={setMessages}
            allMessage={message}
            accesstoken={accesstoken}
            id={id}
            message={writeMessage}
            setWriteMessage={setWriteMessage}
          />
        </div>
      ) : (
        <h1
          style={{
            color: '#fff',
            fontSize: 20,
            fontFamily: 500,
            fontStyle: 'italic',
          }}
        >
          Click on contact to display conversation{' '}
        </h1>
      )}
    </>
  );
};

export default RightContainer;
