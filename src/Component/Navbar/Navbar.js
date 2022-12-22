import React from 'react';
import './navbar.css';
import searchIcon from '../Images/search.png';
import { Bell, CaretDown, ChatDots } from 'phosphor-react';
// import Notifications from '../Images/bell.png';
// import Message from '../Images/message.png';
// import Profileimage from '../Images/Profile.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxContainer/userReducer';
import Popup from './Popup';
export default function Navbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let id = user?.other?._id;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const [mobileAnchor, setMobileAnchor] = React.useState(null);
  const handleMobileMenuClose = () => {
    setMobileAnchor(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileAnchor(event.currentTarget);
  };
  return (
    <div className="mainNavbar">
      <div className="LogoContainer">
        <p>Social</p>
        <div>
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
        </div>
      </div>
      <div className="IconsContainer">
        <Bell size={26} color="#fff" />
        <Link to='/chat'>
        <ChatDots size={26} color={'#fff'} />
        </Link>
        {/* <Link to={`/Profile/${id}`}> */}
        <div
          className="profile"
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
        >
          <img
              src={`${user?.other?.profile}`}
              className="ProfileImage"
              alt=""
            />
          {/* <img src={Profileimage} className="ProfileImage" alt="" /> */}
          <p>{user?.other?.username}</p>
          <CaretDown color="#fff" size={21} />
        </div>
        {
          <Popup
            mobileAnchor={mobileAnchor}
            handleMobileMenuClose={handleMobileMenuClose}
            handleLogout={handleLogout}
            id={id}
          />
        }
        {/* </Link> */}
      </div>
    </div>
  );
}
