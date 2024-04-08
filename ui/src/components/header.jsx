import { Box, Button, Typography } from '@mui/material';
import { useAccount } from "@starknet-react/core";
import React, { useEffect, useState } from 'react';
import { ellipseAddress } from '../helpers/utilities';
import ConnectWallet from './header/connectWallet';

function Header(props) {
  const { connectWallet, showConnectWallet } = props
  const { address } = useAccount()
  const [accountDialog, openAccountDialog] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (connectWallet) {
      openAccountDialog(true)
      showConnectWallet(false)
    }
  }, [connectWallet])

  return (
    <Box sx={styles.header}>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Typography variant='h5'>
          The Blobert Puzzle
        </Typography>
      </Box>

      <Box display={'flex'} gap={4}>
        {address
          ? <Button onClick={handleClick} size='large'>
            <Typography color='black' sx={{ fontSize: '12px' }}>
              {ellipseAddress(address, 4, 4)}
            </Typography>
          </Button>

          : <Button variant='contained' onClick={() => openAccountDialog(true)} sx={{ width: '130px', height: '28px' }}>
            <Typography color='rgba(0,0,0,.65)' sx={{ fontSize: '13px' }}>
              CONNECT
            </Typography>
          </Button>
        }
      </Box>

      <ConnectWallet open={accountDialog} close={openAccountDialog} />
    </Box >
  );
}

export default Header

const styles = {
  header: {
    width: '100%',
    height: '42px',
    borderBottom: '1px solid rgba(0, 0, 0, .1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 4,
    boxSizing: 'border-box',
    gap: 4
  },
  item: {
    letterSpacing: '1px',
  },
  logo: {
    cursor: 'pointer',
    height: '100%',
  },
  content: {
    textDecoration: 'none',
    color: 'white',
  },
  menu: {
    width: 300
  }
};