/* global BigInt */
import { hexToAscii } from "@dojoengine/utils";

export function getPiecesFromEvents(events) {
  let pieces = {}

  events.map(event => {
    const name = hexToAscii(event[0])

    if (name === 'Placement' && event.length === 5) {
      let position = parseInt(event[2])
      let piece = String(parseInt(event[4]))
      pieces[position] = piece
    }

    else if (name === 'Placement' && parseInt(event[1]) === 1) {
      delete pieces[parseInt(event[2])]
    }
  })

  return pieces
}