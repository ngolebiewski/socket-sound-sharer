import { useEffect } from 'react'
import { Howl } from 'howler'
import { socket } from './socket';

const dirtySample = '/sound/DirtySweptA1.wav'
const stringSample = '/sound/MoogStringC2.wav'

const sounds = {
  dirtyMoog: new Howl({ src: [dirtySample], volume: 1 / 3 }),
  stringMoog: new Howl({ src: [stringSample], volume: 1 / 3 }),
};

const App = () => {

  const playSound = (sampleKey) => {
    sounds[sampleKey].play();
    socket.emit('playSound', sampleKey)
    console.log(`SENT: ${sampleKey} played and emitted to io Server`)
  }
  
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    })

    socket.on('emitSound', (sampleKey) => {
      sounds[sampleKey].play();
      console.log(`RECEIVED: ${sampleKey} from io server`);
    });
  }, []);


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
