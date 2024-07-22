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
  },
  connectionStateRecovery: {},
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, "dist")));

app.get("/", function (req, res, next) {
  res.sendFile(join(__dirname, "dist", "index.html"), (err) => {
    if (err) {
      console.error(err);
      next(err);
    }
  });
});

io.on("connection", () => {
  console.log('a user connected');
});

server.listen(PORT, () => {
  console.log("listening on port", PORT);
});
