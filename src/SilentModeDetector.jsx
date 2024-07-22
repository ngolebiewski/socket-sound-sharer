import React, { useEffect } from 'react';

const SilentModeDetector = () => {
  
  const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

  const checkSilentMode = () => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = 'data:audio/mpeg;base64,//NExAAAEAAAAAAAAAAADYwAADsAAEAAADJmAAEAAAD8gAAAAPAAABcAAABAAAAIAAAAAEAAAADAAAA4AAAAAEAAAAAABQAAADwAAAAAAAAAAABAAAAAAAAADwAAAAHAAABA4AAAEAAAAB4AAEBwAAAAEAAAAAIAAAACAAAABAAAAAAAAAIAAAAEAAAAGAAAADAAAAAAAAAIAAAEAAAABAAAAAAADwAABAAAAAAAAAAAAAAAAAA8AIAAAADwAAAAAA';
      
      audio.addEventListener('canplaythrough', () => {
        resolve(false); // Sound played
      });
      
      audio.addEventListener('error', () => {
        resolve(true); // Silent mode or sound issue
      });

      audio.play().catch(() => {
        resolve(true); // Silent mode or sound issue
      });
    });
  };

  useEffect(() => {
    const detectSilentMode = async () => {
      if (isMobileDevice()) {
        const silentMode = await checkSilentMode();
        if (silentMode) {
          alert("Turn silent mode off to activate soundscape.");
        }
      }
    };

    detectSilentMode();
  }, []);

  return null; // This component does not render anything
};

export default SilentModeDetector;