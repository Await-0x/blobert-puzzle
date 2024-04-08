import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Canvas from '../components/canvas';
import Pieces from '../components/pieces';
import AddPiece from '../components/addPiece';
import { useAccount } from '@starknet-react/core';
import RemovePiece from '../components/removePiece';
import { getPiecesEvents } from '../api';
import { getPiecesFromEvents } from '../helpers/events';

function MainPage(props) {
  const [canvasLoading, setCanvasLoading] = useState(true);
  const [canvas, setCanvas] = useState();

  const [remove, setRemove] = useState();
  const [piece, selectPiece] = useState();
  const [position, selectPosition] = useState();
  const { address } = useAccount()

  useEffect(() => {
    fetchCanvas()
  }, [])

  async function fetchCanvas() {
    setCanvasLoading(true)

    let events = await getPiecesEvents([])
    let data = getPiecesFromEvents(events)

    setCanvas(data)

    setCanvasLoading(false)
  }

  const addPieceToCanvas = (position, piece) => {
    setCanvas(prev => ({
      ...prev,
      [position]: piece
    }))

    selectPiece()
    selectPosition()
  }

  const removePieceFromCanvas = (position) => {
    let copy = { ...canvas }

    delete copy[position]

    setCanvas(copy)
    selectPiece()
    selectPosition()
    setRemove()
  }

  return <Box>
    {canvasLoading && <CircularProgress sx={{ position: 'fixed', left: '45%', top: '20%' }} size={'100px'} />}
    {!canvasLoading && <Canvas tmpPiece={position} setTmpPiece={selectPosition} piece={piece} pieces={canvas} />}

    {address && <Pieces
      setTmpPiece={selectPosition} address={address} piece={piece}
      selectPiece={selectPiece} remove={remove} removePiece={setRemove} canvas={canvas}
    />}

    {position >= 0 && <AddPiece piece={piece} position={position} addPiece={addPieceToCanvas} />}
    {remove >= 0 && <RemovePiece piece={remove} canvas={canvas} removePiece={removePieceFromCanvas} />}
  </Box>
}

export default MainPage

const styles = {
};