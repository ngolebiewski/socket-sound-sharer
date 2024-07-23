# Socket Sound Sharer (Take 3)
- Starting this repo after a problem with Vite being not found in a production build on Render and losing a day to the problem.
- Simple sound-scape making app to be used in collaboration with other uses across multiple devices.
- Deployed at...

🔗 https://socket-sound-sharer.onrender.com/


# What is this?
Basic implementation of Socket.io in Vite with React to lay the foundation for making a collaborative web sound scape. Right now a mix of Moog samples and outdoor field recordings from nature.

# Tech
- socket.io for the websockets/live collaboration
- Howler.js for the audio library
- React
- Vite (dev environment/package up react jsx components)
- Node (server side code)
- Express (server)

# Get this running on your local machine
1.  Clone the code from github `git clone git@github.com:ngolebiewski/socket-sound-sharer.git`
2.  `npm install`
3.  `npm run dev` in one terminal window
4.  `npm start` in a second terminal window

# Ideas
- set up rooms based on instrument/sample packs. i.e. Moog, nature, rock n roll, etc.
- database and login, so you can upload your own samples and have those available.
- have a geometric line drawing get made, one line per sample played using the p5.js library. Perhaps 3D with an x,y,z point and user can move shape around, and interact with it to play sounds.
- map keyboard to sound samples.
- tone.js for synthesizing sounds. 