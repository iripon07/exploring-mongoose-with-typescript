import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();

// using cors
app.use(cors());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
  next();
});

export default app;
