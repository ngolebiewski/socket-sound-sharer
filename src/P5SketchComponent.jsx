import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import Sketch from './Sketch'; 

const P5SketchComponent = () => {
  return (
    <div className="p5-sketch-container">
      <ReactP5Wrapper sketch={Sketch} />
    </div>
  );
};

export default P5SketchComponent;
