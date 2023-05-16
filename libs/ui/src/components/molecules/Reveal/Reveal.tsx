import React, { useState } from 'react'
export interface IRevealProps {
  secret: string | number
}

const Reveal = ({ secret }: IRevealProps) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="flex gap-2">
      <button onClick={() => setRevealed((state) => !state)}>
        {revealed ? 'Close' : 'Reveal'}
      </button>
      {revealed ? <p>{secret}</p> : '______'}
    </div>
  )
}

export { Reveal }
