import { Request, Response, NextFunction } from 'express';

export default function booksAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("wow middleware in books module");
  // res.send("wow middleware in books module");
  next();
};