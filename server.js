import express from "express";
import { createServer } from "http";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  connectionStateRecovery: {},
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// Apply CORS middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.static(join(__dirname, "dist")));

app.get("/", (req, res, next) => {
  res.sendFile(join(__dirname, "dist", "index.html"), (err) => {
    if (err) {
      console.error(err);
      next(err);
    }
  });
});

io.on("connection", (socket) => {
  console.log('a user connected');

  // Listen for "playSound" and broadcast it to other users
  socket.on('playSound', (sample) => {
    console.log('Received playSound event');
    socket.broadcast.emit('emitSound', sample);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

server.listen(PORT, () => {
  console.log("listening on port", PORT);
});
