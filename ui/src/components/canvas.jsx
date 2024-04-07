import { Box } from '@mui/material';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { fetchImage } from '../helpers/utilities';

function Canvas(props) {
  const { piece, tmpPiece, setTmpPiece, pieces } = props
  const rows = Array.from({ length: 70 });
  const cells = Array.from({ length: 70 });

  const onTileClick = (row, col) => {
    let position = row * 70 + col

    if (pieces[position]) {
      return
    }

    if (tmpPiece === position) {
      setTmpPiece()
    }

    else if (piece) {
      setTmpPiece(position)
    }
  }

  if (!pieces) {
    return <Box />
  }

  return (
    <TransformWrapper
      maxScale={4}
      limitToBounds={false}
      centerOnInit={true}
    >
      <TransformComponent>
        <Box sx={styles.gridContainer}>

          {React.Children.toArray(
            rows.map((row, rowIndex) => <Box sx={rowIndex < 69 && (rowIndex + 1) % 10 === 0 ? styles.dividerRow : styles.row}>
              {React.Children.toArray(
                cells.map((cell, cellIndex) => <Box sx={cellIndex < 69 && (cellIndex + 1) % 10 === 0 ? styles.dividerTile : styles.tile}
                  onClick={() => onTileClick(rowIndex, cellIndex)}>
                  {pieces[rowIndex * 70 + cellIndex] && <LazyLoadImage
                    alt={""}
                    height={60}
                    width={60}
                    src={fetchImage(pieces[rowIndex * 70 + cellIndex])}
                  />}

                  {piece && tmpPiece == rowIndex * 70 + cellIndex && <LazyLoadImage
                    alt={""}
                    height={60}
                    width={60}
                    src={fetchImage(piece)}
                  />}
                </Box>)
              )}

            </Box>)
          )}

        </Box>
      </TransformComponent>
    </TransformWrapper>
  )
}

export default Canvas

const styles = {
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh'
  },
  row: {
    display: 'flex',
    boxSizing: 'border-box'
  },
  dividerRow: {
    display: 'flex',
    borderBottom: '2px solid black'
  },
  tile: {
    width: '60px',
    height: '60px',
    background: 'white',
    borderRight: '1px dotted rgba(0, 0, 0, 0.15)',
    borderBottom: '1px dotted rgba(0, 0, 0, 0.15)',
    boxSizing: 'border-box',
    cursor: 'pointer'
  },
  dividerTile: {
    width: '62px',
    height: '60px',
    background: 'white',
    borderRight: '2px solid black',
    borderBottom: '1px dotted rgba(0, 0, 0, 0.15)',
    boxSizing: 'border-box',
    cursor: 'pointer'
  },
};