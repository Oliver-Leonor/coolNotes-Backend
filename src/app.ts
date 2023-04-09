import "dotenv/config"
import express, { Request, Response, NextFunction } from 'express';
import NoteModel from './models/note';

const app = express();

// This is to remove the favicon.ico request from the logs
app.get("/favicon.ico", (req, res) => {
    res.sendStatus(204);
  });

  ////

app.get('/', async (req, res, next) => {
  try {
   // throw Error('Bazinga!')
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
})

app.use((req, res, next) => {
  next(Error('Endpoint not found!'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = 'An unknown error occurred!';
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
})

export default app;