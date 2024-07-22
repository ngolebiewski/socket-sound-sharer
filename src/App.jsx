import { useEffect } from 'react'
import { Howl } from 'howler'
import { socket } from './socket';

const loonSample = '/sound/Loon_robertcrosley.wav'

const sounds = {
  dirtyMoog: new Howl({ src: ['/sound/DirtySweptA1.wav'], volume: 1 / 3 }),
  stringMoog: new Howl({ src: ['/sound/MoogStringC2.wav'], volume: 1 / 3 }),
  syncMoog: new Howl({ src: ['sound/Sync_HoldFsharp1.wav'], volume: 1 / 4 }),
  BassC1Moog: new Howl({ src: ['/sound/BassC1.wav'], volume: 1 / 3 }),
  BassC2Moog: new Howl({ src: ['/sound/BassC2.wav'], volume: 1 / 3 }),
  BassC3Moog: new Howl({ src: ['/sound/BassC3.wav'], volume: 1 / 3 }),
  loon: new Howl({ src: [loonSample], volume: 1 / 3 }),
  AmericanGoldfinch: new Howl({ src: ['/sound/AmericanGoldfinch.mp3'], volume: 1 / 3 }),
  fire: new Howl({ src: ['/sound/fire.wav'], volume: 1 / 3 }),
};

const randomStereoPan = () => {
  const random = (Math.random() * 2 - 1).toFixed(1);
  console.log('Random stereo pan -1 left, 1 right:', parseFloat(random))
  return (parseFloat(random));
}

const App = () => {

  const playSound = (sampleKey) => {
    sounds[sampleKey].stereo(randomStereoPan())
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

    return () => {
      socket.off('emitSound');
    };

  }, []);


  return (
    <>
      <h1>Socket Soundscape Sharer</h1>
      {Object.keys(sounds).map(sample => (
        <button key={sample} onClick={() => playSound(sample)}>{sample}</button>
      ))}
    </>
  )
}

export default App
