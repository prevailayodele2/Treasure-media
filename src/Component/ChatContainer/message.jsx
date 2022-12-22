import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { DotsThreeVertical } from 'phosphor-react';
import React from 'react';

const TextMsg = ({ incoming, scroll, message }) => {
  return (
    <Stack
      direction={'row'}
      marginBottom="10px"
      ref={scroll}
      justifyContent={incoming ? 'end' : 'start'}
    >
      <Box
        p={2}
        sx={{
          backgroundColor: incoming ? '#28353e' : '#311b92',
          borderRadius: 1.5,
          width: 'max-content',
          maxWidth: '280px',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body" color={incoming ? '#fff' : '#ebd7d7'}>
          {message}
        </Typography>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

// const Timeline = ({ text }) => {
//   return (
//     <Stack
//       direction={'row'}
//       alignContent="center"
//       justifyContent={'space-between'}
//     >
//       <Divider sx={{ color: '#fff' }} width="46%" />
//       <Typography variant="caption" sx={{ color: '#fff' }}>
//         {text}
//       </Typography>
//       <Divider width="46%" />
//     </Stack>
//   );
// };

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Message_options = [
    {
      title: 'Reply',
    },
    {
      title: 'React to message',
    },
    {
      title: 'Forward message',
    },
    {
      title: 'Star message',
    },
    {
      title: 'Report',
    },
    {
      title: 'Delete Message',
    },
  ];
  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size={25}
        color="#fff"
        cursor="pointer"
      />
      <Menu
        id="basic-menu"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((e, i) => (
            <MenuItem key={i} onClick={handleClick}>
              {e.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

const Message = ({scroll, message }) => {
  console.log(message)
  return (
    <>
      <div className="messageChatContainer">
      {message.map((el, i)=> (<TextMsg  key={i} scroll={scroll} incoming={el?.myself} message={el?.message} /> ))}
        {/* <Timeline text={new Date().toLocaleDateString()} /> */}
      </div>
    </>
  );
};

export default Message;
