import { useState } from 'react'
import { Howl } from 'howler'

const dirtySample = '/sound/DirtySweptA1.wav'
const stringSample = '/sound/MoogStringC2.wav'

const sounds = {
  dirtyMoog: new Howl({ src: [dirtySample], volume: 1 / 3 }),
  stringMoog: new Howl({ src: [stringSample], volume: 1 / 3 }),
};

function App() {
  const playSound = (sampleKey) => {
    sounds[sampleKey].play();
    console.log(`${sampleKey} played`)
  }
  return (
    <>
      <h1>Socket Sound Scape Sharer</h1>
      {Object.keys(sounds).map(sample => (
        <button key={sample} onClick={() => playSound(sample)}>{sample}</button>
      ))}
    </>
  )
}

export default App
