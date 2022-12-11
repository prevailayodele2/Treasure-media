import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { SignOut, UserCircle, UserGear } from 'phosphor-react';

const Popup = ({ mobileAnchor, handleMobileMenuClose, handleLogout, id  }) => {
  return (
    <>
      <Menu
        anchorEl={mobileAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id="mobile-menu"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'top',
        }}
        open={Boolean(mobileAnchor)}
        onClose={handleMobileMenuClose}
      >
        <Link
          style={{ textDecoration: 'none', color: '#131313' }}
          to={`/Profile/${id}`}
        >
          <MenuItem >
            <IconButton
              size="large"
              color="inherit"
            >
                <UserCircle size={28}/>
            </IconButton>
            <span style={{fontSize: '19px', fontWeight: 400}}>Profile</span>
          </MenuItem>
        </Link>
        <Link
          style={{ textDecoration: 'none', color: '#131313' }}
          to={`/${id}/settings`}
        >
          <MenuItem >
            <IconButton
              size="large"
              color="inherit"
            >
                <UserGear size={28}/>
            </IconButton>
            <span>Settings</span>
          </MenuItem>
        </Link>
          <MenuItem onClick={handleLogout}>
            <IconButton
              size="large"
              color="inherit"
            >
                <SignOut color='#ff0000' size={28}/>
            </IconButton>
            <span style={{color: '#ff0000'}}>Log out</span>
          </MenuItem>
      </Menu>
    </>
  );
};

export default Popup;
