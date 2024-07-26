import { useState } from 'react';

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleFooter = () => { setIsExpanded(!isExpanded) };

  return (
    <footer>
      {isExpanded ? (
        <>
          <button onClick={toggleFooter}>-</button>
          <p>First iteration of a collaborative soundscape app.
            When you play a sound, it activates that sound for all users online and draws a line, green for you, magenta for others.
            Right now Moog and outdoors field-recording samples.
            Make some noise (Turn silent-mode off!)
            By: Nick Golebiewski | Source Code: <a href="https://github.com/ngolebiewski/socket-sound-sharer" target='_blank'>Github Repo</a>
          </p>
        </>
      ) : (
        <>
          <button onClick={toggleFooter}>+</button>
          <p>About</p>
        </>
      )}
    </footer>
  );
};

export default Footer;
