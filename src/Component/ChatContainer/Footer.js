import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from 'phosphor-react';
import { useTheme, styled } from '@mui/material/styles';
import React,{ useRef} from 'react';
import { useSearchParams } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
// import { io } from 'socket.io-client'

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: '#fff',
    paddingTop: '12px !important',
    paddingBottom: '12px !important',
  },
}));

const Actions = [
  {
    color: '#4da5fe',
    icon: <Image size={24} />,
    y: 102,
    title: 'Photo/Video',
  },
  {
    color: '#1b8cfe',
    icon: <Sticker size={24} />,
    y: 172,
    title: 'Stickers',
  },
  {
    color: '#0172e4',
    icon: <Camera size={24} />,
    y: 242,
    title: 'Image',
  },
  {
    color: '#0159b2',
    icon: <File size={24} />,
    y: 312,
    title: 'Document',
  },
  {
    color: '#013f7f',
    icon: <User size={24} />,
    y: 382,
    title: 'Contact',
  },
];

const ChatInput = ({ setWriteMessage, openPicker, setOpenPicker }) => {
  const [openActions, setOpenActions] = React.useState(false);

  return (
    <StyledInput
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      onChange={(e) => setWriteMessage(e.target.value)}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: 'max-content' }}>
            <Stack
              sx={{
                position: 'relative',
                display: openActions ? 'inline-block' : 'none',
              }}
            >
              {Actions.map((el) => (
                <Tooltip placement="right" title={el.title}>
                  <Fab
                    onClick={() => {
                      setOpenActions(!openActions);
                    }}
                    sx={{
                      position: 'absolute',
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                    aria-label="add"
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>

            <InputAdornment>
              <IconButton
                onClick={() => {
                  setOpenActions(!openActions);
                }}
              >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <Stack sx={{ position: 'relative' }}>
            <InputAdornment>
              <IconButton
                onClick={() => {
                  setOpenPicker(!openPicker);
                }}
              >
                <Smiley />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
      }}
    />
  );
};

const Footer = ({ accesstoken,currentChat,message,setMessages,allMessage, id, setWriteMessage }) => {
  const theme = useTheme();

  const isMobile = useResponsive('between', 'md', 'xs', 'sm');

  const [searchParams] = useSearchParams();

  const [openPicker, setOpenPicker] = React.useState(false);
  const socket = useRef()

  const sendmsg = () => {
    const messages = {
      myself: true,
      message: message,
    } 
    // socket.current = io('http://localhost:5000');
    socket?.current?.emit('send-msg', {
      to: currentChat._id,
      from: id,
      message: message
    })

    fetch(`https://treasure-media-api.onrender.com/api/chat/msg`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON', token: accesstoken },
      body: JSON.stringify({
        from: id,
        to: currentChat._id,
        message: message
      })
    });
    setMessages(allMessage.concat(messages))
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#28353e !important',
        borderRadius: '15px',
      }}
    >
      <Box
        p={isMobile ? 1 : 2}
        width={'97%'}
        sx={{
          borderRadius: '15px',
          backgroundColor: '#28353e',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Stack direction="row" alignItems={'center'} spacing={isMobile ? 1 : 3}>
          <Stack sx={{ width: '100%' }}>
            <Box
              style={{
                zIndex: 10,
                position: 'fixed',
                display: openPicker ? 'inline' : 'none',
                bottom: 81,
                right: isMobile
                  ? 20
                  : searchParams.get('open') === 'true'
                  ? 420
                  : 100,
              }}
            >
              <Picker
                theme={theme.palette.mode}
                data={data}
                onEmojiSelect={console.log}
              />
            </Box>
            {/* Chat Input */}
            <ChatInput
              setWriteMessage={setWriteMessage}
              openPicker={openPicker}
              setOpenPicker={setOpenPicker}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: 48,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
            onClick={sendmsg}
          >
            <Stack
              sx={{ height: '100%' }}
              alignItems={'center'}
              justifyContent="center"
            >
              <IconButton>
                <PaperPlaneTilt color="#ffffff" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
