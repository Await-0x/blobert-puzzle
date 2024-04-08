import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { DojoContext } from '../contexts/dojoContext';
import { LoadingButton } from '@mui/lab';

function RemovePiece(props) {
  const { piece, canvas, removePiece } = props

  const [removing, setRemoving] = useState(false)
  const dojo = useContext(DojoContext)

  const submit = async () => {
    setRemoving(true)

    let position = Object.keys(canvas).find(key => canvas[key] === piece);

    let res = await dojo.executeTx("blobert_puzzle_v::systems::actions::actions", "remove_piece", [position])

    if (res) {
      removePiece(position)
    }

    setRemoving(false)
  }

  return (
    <Box sx={styles.container}>

      <LoadingButton loading={removing} variant='contained' color='error' sx={{ width: '200px' }} onClick={submit}>
        <Typography color='white' sx={{ fontSize: '16px' }}>
          Remove Piece
        </Typography>
      </LoadingButton>

    </Box>
  )
}

export default RemovePiece

const styles = {
  container: {
    position: 'fixed',
    height: '42px',
    display: 'flex',
    gap: 2,
    p: 1,
    border: '1px solid rgba(0, 0, 0, .25)',
    backgroundColor: '#F5F4F0',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.75)',
    bottom: '30px',
    left: 'calc(50% - 100px)',
    borderRadius: '5px',
  },
};