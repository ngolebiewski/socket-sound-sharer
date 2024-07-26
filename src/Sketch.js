// Sketch.js
// Claude and ChatGPT greatly assisted in the production of this module

import p5 from "p5";
import { socket } from "./socket";

let vertices = [];
let edges = [];
let currentLine = [];
let magentaLines = []; // New array for magenta lines
let angleX = 0;
let angleY = 0;
let zoom = 1800; // Initial zoom level
let lastMouseX = 0;
let lastMouseY = 0;
let isDragging = false;

const generatePolyhedron = (p) => {
  vertices = [];
  edges = [];
  // Generate random vertices for the polyhedron
  for (let i = 0; i < 30; i++) {
    vertices.push({
      x: p.random(-600, 600),
      y: p.random(-600, 600),
      z: p.random(-600, 600),
    });
  }
};

const addMagentaLine = () => {
  const start = vertices[Math.floor(Math.random() * vertices.length)];
  const end = vertices[Math.floor(Math.random() * vertices.length)];
  magentaLines.push([start, end]);
};

const Sketch = (p) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noFill();
    generatePolyhedron(p);

    // Set up socket listener
    socket.on("emitSound", () => {
      addMagentaLine();
    });
  };

  p.draw = () => {
    p.background(0);
    p.stroke(50, 255, 50);
    p.strokeWeight(2);

    // Apply zoom and rotation
    p.translate(0, 0, -zoom);
    p.rotateX(angleX);
    p.rotateY(angleY);

    // Draw green edges
    p.stroke(50, 255, 50);
    for (const [start, end] of edges) {
      p.line(start.x, start.y, start.z, end.x, end.y, end.z);
    }

    // Draw magenta lines
    p.stroke(255, 0, 255);
    for (const [start, end] of magentaLines) {
      p.line(start.x, start.y, start.z, end.x, end.y, end.z);
    }

    // Draw vertices
    p.stroke(50, 255, 50);
    for (const vertex of vertices) {
      p.push();
      p.translate(vertex.x, vertex.y, vertex.z);
      p.sphere(2);
      p.pop();
    }
  };

  p.mousePressed = () => {
    isDragging = true;
    lastMouseX = p.mouseX;
    lastMouseY = p.mouseY;
    if (currentLine.length === 0) {
      currentLine.push(vertices[Math.floor(p.random(vertices.length))]);
    } else {
      const newVertex = vertices[Math.floor(p.random(vertices.length))];
      edges.push([currentLine[currentLine.length - 1], newVertex]);
      currentLine.push(newVertex);
    }
  };

  p.mouseDragged = () => {
    if (isDragging) {
      const dx = p.mouseX - lastMouseX;
      const dy = p.mouseY - lastMouseY;
      angleY += dx * 0.01;
      angleX += dy * 0.01;
      lastMouseX = p.mouseX;
      lastMouseY = p.mouseY;
    }
  };

  p.mouseReleased = () => {
    console.log("mouse released");
    isDragging = false;
  };

  p.mouseWheel = (event) => {
    zoom += event.deltaY;
    zoom = p.constrain(zoom, 10, 4000);
  };

// Add touch event handlers
p.touchStarted = () => {
  isDragging = true;
  lastMouseX = p.touches[0].x;
  lastMouseY = p.touches[0].y;
  if (currentLine.length === 0) {
    currentLine.push(vertices[Math.floor(p.random(vertices.length))]);
  } else {
    const newVertex = vertices[Math.floor(p.random(vertices.length))];
    edges.push([currentLine[currentLine.length - 1], newVertex]);
    currentLine.push(newVertex);
  }
};

p.touchMoved = () => {
  if (isDragging) {
    const dx = p.touches[0].x - lastMouseX;
    const dy = p.touches[0].y - lastMouseY;
    angleY += dx * 0.01;
    angleX += dy * 0.01;
    lastMouseX = p.touches[0].x;
    lastMouseY = p.touches[0].y;
  }
  return false; // prevent default
};

p.touchEnded = () => {
  isDragging = false;
};


  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

export default Sketch;
