import { Box, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { DojoContext } from '../contexts/dojoContext';
import { LoadingButton } from '@mui/lab'

function AddPiece(props) {
  const { position, piece, addPiece } = props
  const dojo = useContext(DojoContext)
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true)

    const res = await dojo.executeTx("blobert_puzzle_v::systems::actions::actions", "add_piece", [position, Number(piece)])

    if (res) {
      addPiece(position, piece);
    }

    setSubmitting(false)
  }

  return (
    <Box sx={styles.container}>

      <LoadingButton variant='contained' color='success' sx={{ width: '200px' }} onClick={submit} loading={submitting}>
        <Typography color='white' sx={{ fontSize: '16px' }}>
          Submit Piece
        </Typography>
      </LoadingButton>

    </Box>
  )
}

export default AddPiece

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