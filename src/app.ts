import "dotenv/config"
import express from 'express';

const app = express();

app.get("/favicon.ico", (req, res) => {
    res.sendStatus(204);
  });

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

export default app;