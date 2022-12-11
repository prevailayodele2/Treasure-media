import { Stack } from '@mui/material';
import React from 'react';

const ShowImage = ({ setShow,image }) => {
  return (
    <>
      <Stack
        width="100vw"
        height="100vh"
        alignItems={'center'}
        justifyContent={'center'}
        display='flex'
        gap={'30px'}
        top={0}
        flexDirection={'row'}
        left={0}
        position={'fixed'}
        zIndex={99}
        sx={{ backgroundColor: '#1313139a' }}
      >
        <img src={image} style={{width: '50vw', height: "100vh", objectFit: 'cover'}} alt="" />
        <span onClick={()=>setShow(false)} style={{fontSize: '50px', color: '#fff', fontWeight: 800, cursor: 'pointer'}}>X</span>
      </Stack>
    </>
  );
};

export default ShowImage;
