import React from 'react';
import './ChatContainer.css';
import searchIcon from '../Images/search.png';
import { Stack } from '@mui/material';
import profileImage from '../Images/Profile.png';
import { DotsThreeVertical } from 'phosphor-react';

const LeftSide = ({ users, id, setCurrentChat }) => {

    

  return (
    <>
      <div className="leftChatContainer">
        <Stack p={2} gap="10px">
          <div className="searchInputContainer">
            <img src={`${searchIcon}`} className="searchIcon" alt="" />
            <input
              type="text"
              className="searchInput"
              placeholder="search your friends"
              name=""
              id=""
            />
          </div>
          <div className="chatpersoncontainer">
            {users?.map((el, i) => (
              <div key={i} className="chatpersonttt" onClick={()=>setCurrentChat(el)}>
                {el?._id !== id ? (
                  <>
                    <div className="chatperson">
                      <img src={el?.profile} alt="" />
                      <Stack display={'flex'} flexDirection="column">
                        <p>{el?.username}</p>
                        <span>start conversation</span>
                      </Stack>
                    </div>
                    <DotsThreeVertical size={20} color="#fff" />
                  </>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        </Stack>
      </div>
    </>
  );
};

export default LeftSide;
