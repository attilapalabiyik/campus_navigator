import express, { Express, NextFunction, Request, Response } from "express";

const app: Express = express();
app.use(express.json());
const port = 8000;

app.use((req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  res.send = function (...args) {
    console.log(
      `${req.hostname}:${req.socket.remotePort} - "${req.method} ${req.originalUrl}" ${res.statusCode}`
    );
    return originalSend.apply(this, args);
  };
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send({ status: "running" });
});

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
