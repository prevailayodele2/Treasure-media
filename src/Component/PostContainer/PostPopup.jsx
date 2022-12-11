import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { ChatCenteredDots, DownloadSimple, Eye, Image } from 'phosphor-react';
import ShowImage from './ShowImage';

const PostPopup = ({ mobileAnchor, handleMobileMenuClose, id, image }) => {
  const [show, setShow] = useState(false);
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
            horizontal: 'right',
          }}
          open={Boolean(mobileAnchor)}
          onClose={handleMobileMenuClose}
        >
          <Link
            style={{ textDecoration: 'none', color: '#131313' }}
            to={`/Profile/${id}`}
          >
            <MenuItem>
              <IconButton size="large" color="inherit">
                <Eye size={28} />
              </IconButton>
              <span style={{ fontSize: '19px', fontWeight: 400 }}>
                View Profile
              </span>
            </MenuItem>
          </Link>
          <MenuItem onClick={() => setShow((see) => !see)}>
            <IconButton size="large" color="inherit">
              <Image size={28} />
            </IconButton>
            <span style={{ fontSize: '19px', fontWeight: 400 }}>
              View post image
            </span>
          </MenuItem>
          {show && <ShowImage image={image} setShow={setShow} />}
          <MenuItem>
            <IconButton size="large" color="inherit">
              <DownloadSimple size={28} />
            </IconButton>
            <span style={{ fontSize: '19px', fontWeight: 400 }}>
             Save Image
            </span>
          </MenuItem>
          <MenuItem>
            <IconButton size="large" color="inherit">
              <ChatCenteredDots size={28} />
            </IconButton>
            <span style={{ fontSize: '19px', fontWeight: 400 }}>
              Reply Privately
            </span>
          </MenuItem>
        </Menu>
    </>
  );
};

export default PostPopup;
