import express from 'express'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express()
const PORT = process.env.PORT || 3000

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, 'dist')));

app.get('/', function (req, res, next) {
  res.sendFile(join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error(err);
      next(err); 
    }
  });
});

app.listen(PORT, () => {console.log("listening on port", PORT)});