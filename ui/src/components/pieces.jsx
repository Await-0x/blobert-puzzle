import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { DojoContext } from '../contexts/dojoContext';
import { fetchImage } from '../helpers/utilities';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { getBloberts } from '../api';

function Pieces(props) {
  const { setTmpPiece, address, piece, selectPiece, remove, removePiece, canvas } = props

  const [loading, setLoading] = useState(true)
  const [tokenIds, setTokenIds] = useState([])

  useEffect(() => {
    getPlayerPieces()
  }, [address])

  async function getPlayerPieces() {
    setLoading(true)

    let tokenIds = await getBloberts(address)

    if (tokenIds && tokenIds.length > 0) {
      setTokenIds(tokenIds)
    }

    setLoading(false)
  }

  const _selectPiece = (tokenId, placed) => {
    setTmpPiece()

    if (placed) {
      selectPiece()

      if (tokenId === remove) {
        removePiece()
      } else {
        removePiece(tokenId)
      }

      return
    }

    if (tokenId === piece) {
      selectPiece()
    } else {
      selectPiece(tokenId)
    }

    removePiece()
  }

  return (
    <Box sx={styles.container}>
      <Typography>Puzzle Pieces</Typography>

      {loading && <CircularProgress sx={{ height: '45px', mt: 2 }} />}

      {!loading && tokenIds.length < 1 && <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Typography color={'error'}>
          No Bloberts found!
        </Typography>

        <Button variant='contained' onClick={() => getPlayerPieces()}>
          Refresh
        </Button>
      </Box>
      }

      {React.Children.toArray(
        tokenIds.map(tokenId => {
          const placed = Object.values(canvas).includes(tokenId);

          return <Box>
            <Box display='flex' alignItems='center' gap={1} mb={'1px'}>
              <Typography>
                #{tokenId}
              </Typography>

              {placed && <MyLocationIcon fontSize='small' color='primary' />}
            </Box>

            <Box onClick={() => _selectPiece(tokenId, placed)} sx={[styles.piece, { opacity: piece ? piece === tokenId ? 1 : 0.5 : 1 }, piece === tokenId && styles.selected]}>
              <LazyLoadImage
                alt={""}
                height={98}
                width={98}
                src={fetchImage(tokenId)}
              />
            </Box>
          </Box>
        }
        )
      )}

    </Box>
  )
}

export default Pieces

const styles = {
  container: {
    position: 'fixed',
    height: 'calc(100vh - 105px)',
    width: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    py: 2,
    border: '1px solid rgba(0, 0, 0, .25)',
    backgroundColor: '#F5F4F0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, .2)',
    right: '20px',
    top: '60px',
    borderRadius: '5px',
    overflowY: 'auto'
  },
  piece: {
    width: '98px',
    height: '98px',
    border: '2px solid rgba(0, 0, 0, .25)',
    cursor: 'pointer'
  },
  selected: {
    border: '2px solid rgba(0, 0, 0, .75)',
  }
};