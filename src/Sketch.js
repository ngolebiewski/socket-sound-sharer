// Sketch.js
import p5 from 'p5';

let vertices = [];
let edges = [];
let currentLine = [];
let angleX = 0;
let angleY = 0;
let zoom = 800; // Initial zoom level
let lastMouseX = 0;
let lastMouseY = 0;
let isDragging = false;

const generatePolyhedron = (p) => {
  vertices = [];
  edges = [];
  // Generate random vertices for the polyhedron
  for (let i = 0; i < 30; i++) {
    vertices.push({
      x: p.random(-300, 300),
      y: p.random(-300, 300),
      z: p.random(-300, 300),
    });
  }
};

const Sketch = (p) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noFill();
    generatePolyhedron(p);
  };

  p.draw = () => {
    p.background(0);
    p.stroke(50, 255, 50);
    p.strokeWeight(2);

    // Apply zoom and rotation
    p.translate(0, 0, -zoom);
    p.rotateX(angleX);
    p.rotateY(angleY);

    // Draw edges
    for (const [start, end] of edges) {
      p.line(start.x, start.y, start.z, end.x, end.y, end.z);
    }

    // Draw vertices
    for (const vertex of vertices) {
      p.push();
      p.translate(vertex.x, vertex.y, vertex.z);
      p.sphere(2); // Draw a small sphere at each vertex
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

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

export default Sketch;